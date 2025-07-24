import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardAnimationProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'rotate' | 'scale' | 'tilt' | 'none';
  initialAnimation?: 'fade' | 'slide' | 'scale' | 'none';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  onClick?: () => void;
}

/**
 * CardAnimation component provides consistent animations for cards throughout the website
 * It wraps card elements with hover and initial animations
 */
const CardAnimation = ({
  children,
  className = '',
  hoverEffect = 'lift',
  initialAnimation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  onClick,
}: CardAnimationProps) => {
  // Initial animation variants
  const getInitialVariants = () => {
    switch (initialAnimation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay } }
        };
      case 'slide':
        const offset = 50;
        const slideProps = {
          up: { hidden: { y: offset }, visible: { y: 0 } },
          down: { hidden: { y: -offset }, visible: { y: 0 } },
          left: { hidden: { x: -offset }, visible: { x: 0 } },
          right: { hidden: { x: offset }, visible: { x: 0 } },
        };
        return {
          hidden: { ...slideProps[direction].hidden, opacity: 0 },
          visible: { 
            ...slideProps[direction].visible, 
            opacity: 1, 
            transition: { duration, delay } 
          }
        };
      case 'scale':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration, delay } }
        };
      default:
        return {
          hidden: {},
          visible: {}
        };
    }
  };

  // Hover animation properties
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          y: -10,
          boxShadow: '0 25px 50px -12px rgba(215, 141, 58, 0.25)',
          transition: { type: 'spring', stiffness: 300 }
        };
      case 'glow':
        return {
          boxShadow: '0 0 20px rgba(215, 141, 58, 0.4)',
          transition: { duration: 0.3 }
        };
      case 'rotate':
        return {
          rotate: 2,
          scale: 1.02,
          transition: { duration: 0.3 }
        };
      case 'scale':
        return {
          scale: 1.05,
          transition: { type: 'spring', stiffness: 300 }
        };
      case 'tilt':
        return {
          rotateX: 5,
          rotateY: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        };
      default:
        return {};
    }
  };

  const variants = getInitialVariants();
  const hoverAnimation = getHoverAnimation();

  return (
    <motion.div
      className={`${className}`}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={hoverEffect !== 'none' ? hoverAnimation : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default CardAnimation;