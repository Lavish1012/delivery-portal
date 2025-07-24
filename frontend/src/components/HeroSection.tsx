import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from './AnimatedElement';
import ParallaxBackground from './ParallaxBackground';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Define background elements for the ParallaxBackground component
  const backgroundElements = [
    {
      className: "absolute inset-0 z-0 opacity-10",
      parallaxFactor: 0.02,
      animation: 'none' as const,
      style: {
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '20px 20px',
      }
    },
    {
      className: "absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-[#D78D3A] to-[#F2A65A] opacity-20 blur-3xl",
      parallaxFactor: -0.05,
      animation: 'pulse' as const
    },
    {
      className: "absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-[#D78D3A] to-[#F2A65A] opacity-10 blur-3xl",
      parallaxFactor: 0.03,
      animation: 'float' as const
    }
  ];

  return (
    <ParallaxBackground
      backgroundElements={backgroundElements}
      className="bg-[#1A1A1C] dark:bg-[#1A1A1C] text-white py-16 lg:py-24 min-h-[90vh] flex items-center"
      scrollFactor={0.7}
      fadeOut={true}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <AnimatedElement 
            className="lg:w-1/2 space-y-6"
            type="fade"
            direction="up"
            duration={0.8}
            delay={0.2}
          >
            <AnimatedElement 
              className="text-4xl md:text-5xl font-bold leading-tight"
              type="fade"
              direction="up"
              duration={0.5}
              delay={0.3}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Find 
              </motion.span>
              <motion.span 
                className="text-[#D78D3A]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05, color: "#F2A65A" }}
              >
                local products
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                from shops near you
              </motion.span>
            </AnimatedElement>
            
            <AnimatedElement 
              className="mt-4 text-xl text-gray-300 hover-text"
              type="fade"
              direction="up"
              duration={0.5}
              delay={0.7}
              whileHover={{ color: "#F2A65A", scale: 1.01, transition: { duration: 0.2 } }}
            >
              Discover hard-to-find items at nearby stores in real-time. Support local businesses
              while getting what you need, when you need it.
            </AnimatedElement>
            
            <AnimatedElement
              type="fade"
              direction="up"
              duration={0.5}
              delay={0.8}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="bg-[#D78D3A] hover:bg-[#C07C33] text-white px-8 py-6 rounded-lg font-semibold shadow-lg flex items-center gap-2 text-lg hover-grow group">
                <Link to="/explore" className="flex items-center">
                  Explore Local Shops 
                  <motion.span
                    className="ml-2 inline-flex"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight />
                  </motion.span>
                </Link>
              </Button>
            </AnimatedElement>
            
            <AnimatedElement 
              className="flex items-center gap-4 text-sm text-gray-400 mt-8"
              type="fade"
              delay={1.2}
              duration={0.5}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <AnimatedElement
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1A1A1C] flex items-center justify-center text-xs" // Removed 'hover-icon' and 'floating'
                    type="fade"
                    direction="right"
                    initial={{ opacity: 0, x: -10, y: 0 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -5, 0] // Floating y-animation
                    }}
                    transition={{
                      opacity: { delay: 1.2 + (i * 0.1), duration: 0.3 },
                      x: { delay: 1.2 + (i * 0.1), duration: 0.3 },
                      y: {
                        delay: 1.2 + (i * 0.1) + 0.3, // Start y animation after opacity/x complete
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror"
                      }
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.2,
                      backgroundColor: "#D78D3A",
                      borderColor: "#F2A65A",
                      color: "#F2A65A",
                      boxShadow: [
                        "0 0 0 0px rgba(242, 166, 90, 0.4)",
                        "0 0 0 6px rgba(242, 166, 90, 0)",
                        "0 0 0 0px rgba(242, 166, 90, 0)" // Final state of one iteration for pulse
                      ],
                      transition: {
                        default: { duration: 0.2, type: "spring", stiffness: 300 },
                        boxShadow: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                          times: [0, 0.7, 1]
                        }
                      }
                    }}
                  >
                    {i}
                  </AnimatedElement>
                ))}
              </div>
              <span>Joined by 10,000+ users</span>
            </AnimatedElement>
            <Button asChild variant="outline" className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-6 rounded-lg font-semibold shadow-lg flex items-center gap-2 text-lg hover-grow group">
              <Link to="/register" className="flex items-center">
                Register Your Shop 
                <motion.span
                  className="ml-2 inline-flex"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight />
                </motion.span>
              </Link>
            </Button>
          </AnimatedElement>
          
          <AnimatedElement 
            className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center"
            type="scale"
            duration={0.8}
            delay={0.5}
          >
            <AnimatedElement 
                className="relative w-full max-w-md hover-card"
                hoverEffect="lift"
                whileHover={{ y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(215, 141, 58, 0.25)" }}
              >
              <AnimatedElement 
                className="bg-[#2B2B2E] p-6 rounded-xl shadow-2xl overflow-hidden relative z-10"
                type="slide"
                direction="up"
                delay={0.6}
                duration={0.8}
              >
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gradient-to-br from-[#2B2B2E] to-[#3A3A3D] flex items-center justify-center h-64">
                  <AnimatedElement 
                    className="text-[#D78D3A] text-6xl font-bold"
                    type="pulse"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, 0, -1, 0],
                    }}
                    transition={{ 
                      duration: 5, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: "#F2A65A",
                      textShadow: "0 0 15px rgba(242, 166, 90, 0.5)"
                    }}
                  >
                    SB
                  </AnimatedElement>
                </div>
                
                {/* Floating elements */}
                <AnimatedElement 
                    className="absolute -top-4 -right-4 bg-[#D78D3A] text-white p-2 rounded-lg shadow-lg hover-grow"
                    type="float"
                    hoverEffect="grow"
                    whileHover={{ scale: 1.1, backgroundColor: "#F2A65A" }}
                  >
                  <span className="text-sm font-medium">New Arrivals</span>
                </AnimatedElement>
                
                <AnimatedElement 
                    className="absolute -bottom-3 -left-3 bg-white text-[#1A1A1C] p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center hover-grow"
                    type="rotate"
                    hoverEffect="grow"
                    whileHover={{ scale: 1.15, backgroundColor: "#F2F2F2", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  >
                  <span className="text-sm font-bold">50% OFF</span>
                </AnimatedElement>
              </AnimatedElement>
              
              {/* Background shape */}
              <AnimatedElement 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#D78D3A]/20 to-transparent rounded-full blur-3xl -z-10"
                type="pulse"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Empty div to satisfy children prop requirement */}
                <div></div>
              </AnimatedElement>
            </AnimatedElement>
          </AnimatedElement>
        </div>
      </div>
    </ParallaxBackground>
  );
};

export default HeroSection;