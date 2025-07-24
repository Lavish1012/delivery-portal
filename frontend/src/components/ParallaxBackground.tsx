import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  backgroundElements?: Array<{
    className: string;
    parallaxFactor: number;
    animation?: 'float' | 'pulse' | 'rotate' | 'none';
  }>;
  scrollFactor?: number;
  fadeOut?: boolean;
}

const ParallaxBackground = ({
  children,
  className = '',
  backgroundElements = [],
  scrollFactor = 0.5,
  fadeOut = true,
}: ParallaxBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Parallax effect on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * scrollFactor]);
  // Always call useTransform for opacity to avoid conditional hook
  const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Track mouse position for mouse-based parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax values based on mouse position
  const calculateParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  // Get animation properties based on animation type
  const getAnimation = (type: 'float' | 'pulse' | 'rotate' | 'none') => {
    switch (type) {
      case 'float':
        return {
          y: [0, -15, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        };
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        };
      case 'rotate':
        return {
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background elements with parallax effect */}
      {backgroundElements.map((element, index) => (
        <motion.div
          key={index}
          className={element.className}
          animate={{
            ...getAnimation(element.animation || 'none'),
            x: calculateParallax(element.parallaxFactor).x,
            y: calculateParallax(element.parallaxFactor).y
          }}
          transition={{ type: 'spring', damping: 15 }}
        />
      ))}
      
      {/* Main content with scroll parallax */}
      <motion.div 
        className="relative z-10"
        style={{ y, ...(fadeOut ? { opacity: opacityTransform } : {}) }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxBackground;