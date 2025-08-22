import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  business_name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  rating: number;
  review_count: number;
  services: any; // JSON field from database
  latitude?: number;
  longitude?: number;
  distance?: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
}

const VendorDiscovery = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

  const provinces = [
    'Western Cape', 'Eastern Cape', 'Northern Cape', 'Free State',
    'KwaZulu-Natal', 'North West', 'Gauteng', 'Mpumalanga', 'Limpopo'
  ];

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (userLocation || searchCity) {
      fetchVendors();
    }
  }, [userLocation, searchCity, selectedProvince]);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        
        // Try to get city name from coordinates
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setUserLocation({ ...location, city: data.city || data.locality });
        } catch (error) {
          console.error('Error getting city name:', error);
          setUserLocation(location);
        }
        setLocationPermission('granted');
        toast.success('Location detected successfully');
      },
      (error) => {
        setLocationPermission('denied');
        console.error('Error getting location:', error);
        toast.error('Please search by city instead');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchVendors = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vendors')
        .select('*')
        .eq('active', true);

      // Filter by province if selected
      if (selectedProvince) {
        query = query.eq('province', selectedProvince);
      }

      // Filter by city if searching
      if (searchCity) {
        query = query.ilike('city', `%${searchCity}%`);
      }

      const { data, error } = await query.limit(20);

      if (error) {
        throw error;
      }

      let vendorsWithDistance = data || [];

      // Calculate distances if user location is available
      if (userLocation && vendorsWithDistance.length > 0) {
        vendorsWithDistance = vendorsWithDistance
          .map(vendor => ({
            ...vendor,
            distance: vendor.latitude && vendor.longitude
              ? calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  parseFloat(vendor.latitude.toString()),
                  parseFloat(vendor.longitude.toString())
                )
              : undefined
          }))
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      }

      setVendors(vendorsWithDistance as unknown as Vendor[]);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load nearby barbers');
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (vendor: Vendor) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(vendor.address + ', ' + vendor.city + ', ' + vendor.province)}`;
    window.open(url, '_blank');
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please sign in to discover nearby barbers</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All provinces</SelectItem>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {locationPermission === 'denied' && (
          <Button onClick={requestLocation} variant="outline" className="whitespace-nowrap">
            <MapPin className="w-4 h-4 mr-2" />
            Use Location
          </Button>
        )}
      </div>

      {userLocation && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {userLocation.city ? `Showing barbers near ${userLocation.city}` : 'Showing barbers near your location'}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No barbers found in this area. Try searching in a different city or province.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="line-clamp-1">{vendor.business_name}</span>
                  {vendor.distance && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {vendor.distance.toFixed(1)}km
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {vendor.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{vendor.address}, {vendor.city}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({vendor.review_count})</span>
                  </div>
                  
                  {vendor.phone && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`tel:${vendor.phone}`}>
                        <Phone className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>

                {vendor.services && Array.isArray(vendor.services) && vendor.services.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Services</h4>
                    <div className="space-y-1">
                      {vendor.services.slice(0, 3).map((service: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{service.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">R{service.price}</span>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{service.duration}min</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => getDirections(vendor)}
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorDiscovery;