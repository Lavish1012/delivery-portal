
import { Search, MapPin, ShoppingBag, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: "Search for products",
    description: "Enter what you're looking for and find it in stores near you.",
    color: "bg-market-primary"
  },
  {
    icon: <MapPin className="h-8 w-8 text-white" />,
    title: "Discover nearby shops",
    description: "See all nearby shops with real-time inventory and availability.",
    color: "bg-market-secondary"
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    title: "Reserve or buy",
    description: "Reserve items for pickup or pay online for faster collection.",
    color: "bg-market-accent"
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-white" />,
    title: "Pick up & enjoy",
    description: "Skip the wait with reserved items ready when you arrive.",
    color: "bg-gray-700"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How LocalMarket Connect Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover products from local shops in just a few steps. No more searching from shop to shop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
