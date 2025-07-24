import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

// Define an explicit type for animation states
interface AnimationState {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotate?: number;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    // Add other transition properties if needed
  };
  // Allow any other framer-motion properties
  [key: string]: any;
}

interface TextAnimationProps {
  children: ReactNode;
  className?: string;
  type?: 'heading' | 'paragraph' | 'highlight' | 'gradient';
  staggerChildren?: boolean;
  staggerDelay?: number;
  highlightColor?: string;
  delay?: number;
  duration?: number;
  hoverEffect?: 'scale' | 'color' | 'underline' | 'glow' | 'none';
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * TextAnimation component provides consistent animations for text elements throughout the website
 * It supports different text types, staggered animations, and hover effects
 */
const TextAnimation = ({
  children,
  className = '',
  type = 'paragraph',
  staggerChildren = false,
  staggerDelay = 0.1,
  highlightColor = '#D78D3A',
  delay = 0,
  duration = 0.5,
  hoverEffect = 'none',
  direction = 'up',
}: TextAnimationProps) => {
  // Base animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Child animation variants based on direction
  const getChildVariants = () => {
    // Initialize with all possible properties to avoid TypeScript errors
    const baseVariants: { hidden: AnimationState; visible: AnimationState } = {
      hidden: { 
        opacity: 0,
        x: 0,
        y: 0
      },
      visible: { 
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration }
      }
    };

    // Add direction-based transforms
    switch (direction) {
      case 'up':
        baseVariants.hidden.y = 20;
        baseVariants.visible.y = 0;
        break;
      case 'down':
        baseVariants.hidden.y = -20;
        baseVariants.visible.y = 0;
        break;
      case 'left':
        baseVariants.hidden.x = -20;
        baseVariants.visible.x = 0;
        break;
      case 'right':
        baseVariants.hidden.x = 20;
        baseVariants.visible.x = 0;
        break;
    }

    return baseVariants;
  };

  // Get hover effect properties
  const getHoverEffect = () => {
    switch (hoverEffect) {
      case 'scale':
        return { scale: 1.05 };
      case 'color':
        return { color: highlightColor };
      case 'underline':
        return { textDecoration: 'underline', textDecorationColor: highlightColor };
      case 'glow':
        return { textShadow: `0 0 8px ${highlightColor}40` };
      default:
        return {};
    }
  };

  // Get class names based on text type
  const getTypeClasses = () => {
    switch (type) {
      case 'heading':
        return 'font-bold leading-tight';
      case 'paragraph':
        return 'leading-relaxed';
      case 'highlight':
        return `text-${highlightColor} font-medium`;
      case 'gradient':
        return `bg-gradient-to-r from-[#D78D3A] to-[#F2A65A] bg-clip-text text-transparent font-bold`;
      default:
        return '';
    }
  };

  const childVariants = getChildVariants();
  const hoverEffects = getHoverEffect();
  const typeClasses = getTypeClasses();

  // If staggering children, wrap each child in a motion element
  if (staggerChildren && React.Children.count(children) > 1) {
    return (
      <motion.div
        className={`${className} ${typeClasses}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={childVariants}
            whileHover={hoverEffect !== 'none' ? hoverEffects : undefined}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Otherwise, animate the entire text block
  return (
    <motion.div
      className={`${className} ${typeClasses}`}
      initial="hidden"
      animate="visible"
      variants={childVariants}
      whileHover={hoverEffect !== 'none' ? hoverEffects : undefined}
    >
      {children}
    </motion.div>
  );
};

export default TextAnimation;