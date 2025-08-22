import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Store, ArrowRight, Clock, Calendar, TrendingUp } from "lucide-react";

export const RoleSelection = () => {
  return (
    <section id="features" className="py-16 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for the perfect haircut or running a barber shop, QueueCut transforms your experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Client Card */}
          <Card className="p-8 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">I'm a Client</h3>
                  <p className="text-muted-foreground">Find and book haircuts</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Real-time availability & wait times</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Book precise time slots</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-accent" />
                  <span>Skip the queue completely</span>
                </div>
              </div>
              
              <Button variant="premium" size="lg" className="w-full">
                Start Booking Haircuts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          
          {/* Vendor Card */}
          <Card className="p-8 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Store className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">I'm a Vendor</h3>
                  <p className="text-muted-foreground">Manage my barber shop</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span>Increase revenue & reduce no-shows</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>Smart scheduling & capacity management</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-accent" />
                  <span>Live queue & timeline dashboard</span>
                </div>
              </div>
              
              <Button variant="accent" size="lg" className="w-full">
                Setup My Shop
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};