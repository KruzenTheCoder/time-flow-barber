import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { RoleSelection } from "@/components/RoleSelection";
import { BookingDemo } from "@/components/BookingDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <RoleSelection />
        <BookingDemo />
      </main>
    </div>
  );
};

export default Index;
