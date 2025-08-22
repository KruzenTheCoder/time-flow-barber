import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Scissors, DollarSign } from "lucide-react";

export const BookingDemo = () => {
  const mockBarbers = [
    {
      id: 1,
      name: "Elite Cuts Studio",
      rating: 4.9,
      distance: "0.3 mi",
      nextAvailable: "2:30 PM",
      price: "$35",
      services: ["Haircut", "Beard Trim"],
      image: "👨‍💼"
    },
    {
      id: 2,
      name: "Classic Barber Co.",
      rating: 4.8,
      distance: "0.7 mi",
      nextAvailable: "3:15 PM",
      price: "$28",
      services: ["Haircut", "Shave"],
      image: "✂️"
    },
    {
      id: 3,
      name: "Modern Edge Salon",
      rating: 4.7,
      distance: "1.2 mi",
      nextAvailable: "4:00 PM",
      price: "$45",
      services: ["Haircut", "Styling"],
      image: "💇‍♂️"
    }
  ];

  const timeSlots = [
    { time: "2:30 PM", available: true, price: "$35" },
    { time: "3:00 PM", available: true, price: "$35" },
    { time: "3:30 PM", available: false, price: "$35" },
    { time: "4:00 PM", available: true, price: "$35" },
    { time: "4:30 PM", available: true, price: "$40" },
    { time: "5:00 PM", available: true, price: "$40" }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">See It In Action</h2>
          <p className="text-xl text-muted-foreground">
            From discovery to checkout in under 60 seconds
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Barber Discovery */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" />
              1. Find Available Barbers
            </h3>
            <div className="space-y-4">
              {mockBarbers.map((barber) => (
                <Card key={barber.id} className="p-4 hover:shadow-card transition-all duration-300 border border-border bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{barber.image}</div>
                      <div>
                        <h4 className="font-semibold">{barber.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            {barber.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {barber.distance}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {barber.nextAvailable}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {barber.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-accent">{barber.price}</div>
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Time Slot Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Clock className="h-6 w-6 text-accent" />
              2. Choose Your Time
            </h3>
            <Card className="p-6 border border-border bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Elite Cuts Studio</h4>
                  <Badge variant="outline">Today</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outline" : "ghost"}
                      disabled={!slot.available}
                      className={`flex flex-col gap-1 h-auto py-3 ${
                        slot.available 
                          ? "hover:bg-accent hover:text-accent-foreground" 
                          : "opacity-50"
                      }`}
                    >
                      <span className="font-medium">{slot.time}</span>
                      <span className="text-xs">{slot.price}</span>
                    </Button>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span>Haircut + Beard Trim</span>
                    <span className="font-semibold">$35.00</span>
                  </div>
                  <Button variant="hero" className="w-full">
                    <DollarSign className="h-4 w-4" />
                    Book & Pay
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};