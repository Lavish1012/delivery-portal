
import { Star, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const shops = [
  {
    id: 1,
    name: "Sharma Electronics",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.7,
    distance: "0.8 km",
    status: "Open",
    openUntil: "9:00 PM"
  },
  {
    id: 2,
    name: "Metro Grocers",
    image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Groceries",
    rating: 4.5,
    distance: "1.2 km",
    status: "Open",
    openUntil: "10:00 PM"
  },
  {
    id: 3,
    name: "Fashion Hub",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.3,
    distance: "1.5 km",
    status: "Open",
    openUntil: "8:00 PM"
  },
  {
    id: 4,
    name: "Kumar Books & Stationery",
    image: "https://images.unsplash.com/photo-1532018047052-a7e3de9eb59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Books & Stationery",
    rating: 4.8,
    distance: "0.5 km",
    status: "Open",
    openUntil: "8:30 PM"
  }
];

const ShopSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Shops Nearby</h2>
            <p className="mt-2 text-gray-600">Explore top-rated local shops around you</p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View all shops <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.map((shop) => (
            <div 
              key={shop.id}
              className="shop-card rounded-lg overflow-hidden border bg-white"
            >
              <div className="relative h-48">
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                  {shop.category}
                </div>
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {shop.status}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg">{shop.name}</h3>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{shop.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {shop.distance}
                  </div>
                </div>
                
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Open until {shop.openUntil}</span>
                </div>
                
                <Button variant="outline" className="mt-4 w-full">View Shop</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
