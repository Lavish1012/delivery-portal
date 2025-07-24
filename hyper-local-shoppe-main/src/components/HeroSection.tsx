
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="hero-pattern py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find <span className="text-market-primary">local products</span> from shops near you
            </h1>
            <p className="mt-4 text-xl text-gray-600 md:pr-10">
              Discover hard-to-find items at nearby stores in real-time. Support local businesses while getting what you need, when you need it.
            </p>
            
            <div className="mt-8 bg-white p-4 rounded-lg shadow-lg max-w-lg">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-market-secondary" />
                <span className="text-gray-700">New Delhi, India</span>
              </div>
              <div className="flex">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                    className="w-full px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-market-primary focus:border-transparent"
                  />
                  <Search className="h-5 w-5 absolute right-3 top-3.5 text-gray-400" />
                </div>
                <Button size="lg" className="rounded-l-none">
                  Search
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Electronics</span>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Groceries</span>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Stationery</span>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Fashion</span>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Home Decor</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center space-x-2">
              <span className="text-sm text-gray-500">Are you a shop owner?</span>
              <Button variant="link" className="p-0 h-auto text-market-primary">
                List your business <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-10 animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Local shop with customers" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
