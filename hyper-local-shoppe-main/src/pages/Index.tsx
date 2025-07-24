
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import ShopSection from "@/components/ShopSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import AppDownload from "@/components/AppDownload";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <HowItWorks />
        <ShopSection />
        <FeaturesSection />
        <TestimonialSection />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
