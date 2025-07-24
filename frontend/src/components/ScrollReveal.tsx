import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  // Set initial and animate values based on direction
  const getDirectionValues = () => {
    switch (direction) {
      case 'up':
        return { initial: { y: 50 }, animate: { y: 0 } };
      case 'down':
        return { initial: { y: -50 }, animate: { y: 0 } };
      case 'left':
        return { initial: { x: 50 }, animate: { x: 0 } };
      case 'right':
        return { initial: { x: -50 }, animate: { x: 0 } };
      default:
        return { initial: { y: 50 }, animate: { y: 0 } };
    }
  };

  const { initial, animate } = getDirectionValues();

  return (
    <motion.div
      ref={ref}
      initial={{ ...initial, opacity: 0 }}
      animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing function
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;