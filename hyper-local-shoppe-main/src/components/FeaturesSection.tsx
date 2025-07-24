
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-market-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Connecting Shoppers with Local Businesses</h2>
            <p className="mt-4 text-gray-600">
              LocalMarket Connect bridges the gap between nearby brick-and-mortar shopkeepers and customers seeking products in real time, empowering local retailers to compete in the digital age.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-market-primary/10 rounded-full p-1">
                  <Check className="h-5 w-5 text-market-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Real-Time Inventory</h3>
                  <p className="mt-1 text-sm text-gray-600">See what's in stock before visiting</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-market-primary/10 rounded-full p-1">
                  <Check className="h-5 w-5 text-market-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Secure Reservations</h3>
                  <p className="mt-1 text-sm text-gray-600">Hold items with a small deposit</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-market-primary/10 rounded-full p-1">
                  <Check className="h-5 w-5 text-market-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">In-App Communication</h3>
                  <p className="mt-1 text-sm text-gray-600">Chat directly with shop owners</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-market-primary/10 rounded-full p-1">
                  <Check className="h-5 w-5 text-market-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Multiple Payment Options</h3>
                  <p className="mt-1 text-sm text-gray-600">Pay online or in-store</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Shop owner using LocalMarket Connect app"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
