import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div
      className="bg-indigo-600 dark:bg-gray-900 text-white py-16 lg:py-24"
      role="region"
      aria-label="Hero Section"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find <span className="text-yellow-400">local products</span> from shops near you
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Discover hard-to-find items at nearby stores in real-time. Support local businesses
              while getting what you need, when you need it.
            </p>
            <Button
              size="lg"
              className="mt-8 bg-indigo-600 dark:bg-yellow-400 text-white dark:text-black hover:bg-indigo-700 dark:hover:bg-yellow-500"
              aria-label="Search for Products"
            >
              Search Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;