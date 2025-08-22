import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { RoleSelection } from "@/components/RoleSelection";
import { BookingDemo } from "@/components/BookingDemo";
import VendorDiscovery from "@/components/VendorDiscovery";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        {user ? (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Find Nearby Barbers</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover top-rated barbers and salons in South Africa. Book instantly or join the smart waitlist.
                </p>
              </div>
              <VendorDiscovery />
            </div>
          </section>
        ) : (
          <>
            <RoleSelection />
            <BookingDemo />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
