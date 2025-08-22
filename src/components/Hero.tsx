import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Star, Zap } from "lucide-react";
import heroImage from "@/assets/hero-barber-shop.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent-foreground text-sm font-medium">
                <Zap className="h-4 w-4" />
                Zero-Wait Haircuts
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Skip the Queue,
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Book Your Perfect Cut</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Find available barbers in real-time, book precise time slots, and arrive exactly when it's your turn. No more waiting rooms.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Book a Haircut
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Join as Vendor
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Average 0-min wait</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">500+ locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">4.9/5 rating</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20 transform scale-105"></div>
            <Card className="relative overflow-hidden shadow-elegant border-0 bg-white">
              <img 
                src={heroImage} 
                alt="Modern professional barber shop" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Elite Cuts Studio</h3>
                    <p className="text-white/80 text-sm">Available in 15 minutes</p>
                  </div>
                  <Button variant="accent" size="sm">
                    Book Now
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