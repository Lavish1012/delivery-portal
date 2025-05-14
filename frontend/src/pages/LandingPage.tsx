import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

const LandingPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default LandingPage;