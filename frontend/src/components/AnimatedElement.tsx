import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'pulse' | 'bounce' | 'float';
type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface AnimatedElementProps extends Omit<MotionProps, 'animate' | 'whileInView' | 'viewport'> {
  children: ReactNode;
  type?: AnimationType;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  hoverEffect?: 'grow' | 'glow' | 'lift' | 'highlight' | 'pulse' | 'none';
  triggerInView?: boolean;
  viewportConfig?: { once?: boolean; amount?: number }; // Renamed from 'viewport'

  // Allow direct pass-through of these core framer-motion props
  animate?: MotionProps['animate'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport']; // This is framer-motion's ViewportOptions
}

interface AnimationState {
  opacity?: number;
  x?: number | string;
  y?: number | string | (number | string)[];
  scale?: number;
  rotate?: number;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    repeat?: number;
    repeatType?: "loop" | "reverse" | "mirror";
    times?: number[];
  };
  [key: string]: any; // Add index signature
}

const AnimatedElement = ({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  hoverEffect = 'none',
  // AnimatedElement specific controls:
  triggerInView = false,
  viewportConfig = { once: true, amount: 0.3 }, // Default for our internal logic
  // User overrides / pass-throughs for core motion props:
  animate: animatePropFromUser,
  whileInView: whileInViewPropFromUser,
  viewport: viewportPropFromUser, // User-supplied ViewportOptions for framer-motion
  ...restMotionProps
}: AnimatedElementProps) => {
  // Animation variants based on type and direction
  const getAnimationVariants = () => {
    const baseVariants: { hidden: AnimationState; visible: AnimationState } = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }
      }
    };

    // Add direction-based transforms
    if (direction !== 'none') {
      switch (direction) {
        case 'up':
          baseVariants.hidden.y = 50;
          baseVariants.visible.y = 0;
          break;
        case 'down':
          baseVariants.hidden.y = -50;
          baseVariants.visible.y = 0;
          break;
        case 'left':
          baseVariants.hidden.x = -50;
          baseVariants.visible.x = 0;
          break;
        case 'right':
          baseVariants.hidden.x = 50;
          baseVariants.visible.x = 0;
          break;
      }
    }

    // Add type-specific animations
    switch (type) {
      case 'scale':
        baseVariants.hidden.scale = 0.8;
        baseVariants.visible.scale = 1;
        break;
      case 'rotate':
        baseVariants.hidden.rotate = direction === 'left' ? -10 : 10;
        baseVariants.visible.rotate = 0;
        break;
      case 'pulse':
        if (!baseVariants.visible.transition) baseVariants.visible.transition = {};
        baseVariants.visible.transition.repeat = Infinity;
        baseVariants.visible.transition.repeatType = 'reverse';
        break;
      case 'bounce':
        baseVariants.visible.y = [0, -10, 0];
        if (!baseVariants.visible.transition) baseVariants.visible.transition = {};
        baseVariants.visible.transition.repeat = Infinity;
        baseVariants.visible.transition.times = [0, 0.5, 1];
        break;
      case 'float':
        baseVariants.visible.y = [0, -15, 0];
        if (!baseVariants.visible.transition) baseVariants.visible.transition = {};
        baseVariants.visible.transition.repeat = Infinity;
        baseVariants.visible.transition.duration = 3;
        baseVariants.visible.transition.ease = 'easeInOut';
        break;
    }

    return baseVariants;
  };

  // Hover effects
  const getHoverEffects = () => {
    switch (hoverEffect) {
      case 'grow':
        return {
          scale: 1.05,
          y: -5,
          transition: { type: 'spring', stiffness: 300 }
        };
      case 'glow':
        return {
          boxShadow: '0 0 15px rgba(215, 141, 58, 0.5)',
          scale: 1.02,
          transition: { duration: 0.3 }
        };
      case 'lift':
        return {
          y: -8,
          boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
          transition: { type: 'spring', stiffness: 300 }
        };
      case 'highlight':
        return {
          backgroundColor: 'rgba(215, 141, 58, 0.1)',
          borderColor: 'rgba(215, 141, 58, 0.5)',
          transition: { duration: 0.3 }
        };
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        };
      default:
        return {};
    }
  };

  const variants = getAnimationVariants();
  const hoverEffects = getHoverEffects();

  // Determine final animation props for motion.div
  const finalAnimate = animatePropFromUser ?? (!triggerInView ? 'visible' : undefined);
  const finalWhileInView = whileInViewPropFromUser ?? (triggerInView ? 'visible' : undefined);
  
  // Determine final viewport settings for motion.div:
  // User's direct 'viewport' prop (MotionProps['viewport']) takes highest precedence.
  // Else, if triggerInView is true (meaning internal logic might apply), use our 'viewportConfig'.
  const finalViewport = viewportPropFromUser ?? (triggerInView ? viewportConfig : undefined);

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={finalAnimate}
      whileInView={finalWhileInView}
      viewport={finalViewport}
      variants={variants}
      whileHover={hoverEffect !== 'none' ? hoverEffects : undefined}
      {...restMotionProps}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;