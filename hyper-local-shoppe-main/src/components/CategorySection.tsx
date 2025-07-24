
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Electronics",
    icon: "📱",
    itemCount: 1543,
    color: "bg-blue-50 text-blue-600"
  },
  {
    name: "Groceries",
    icon: "🍎",
    itemCount: 2876,
    color: "bg-green-50 text-green-600"
  },
  {
    name: "Fashion",
    icon: "👕",
    itemCount: 1987,
    color: "bg-purple-50 text-purple-600"
  },
  {
    name: "Home Decor",
    icon: "🏠",
    itemCount: 1254,
    color: "bg-amber-50 text-amber-600"
  },
  {
    name: "Books",
    icon: "📚",
    itemCount: 876,
    color: "bg-red-50 text-red-600"
  },
  {
    name: "Toys & Games",
    icon: "🎮",
    itemCount: 654,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    name: "Pharmacy",
    icon: "💊",
    itemCount: 432,
    color: "bg-teal-50 text-teal-600"
  },
  {
    name: "Stationery",
    icon: "✏️",
    itemCount: 765,
    color: "bg-orange-50 text-orange-600"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
            <p className="mt-2 text-gray-600">Find products from different categories around you</p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="category-item rounded-lg border bg-white overflow-hidden"
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.itemCount.toLocaleString()} items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
