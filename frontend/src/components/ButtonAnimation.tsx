import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonAnimationProps {
  children: ReactNode;
  className?: string;
  color?: string;
  hoverColor?: string;
  hoverScale?: number;
  tapScale?: number;
  arrowAnimation?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
}

/**
 * ButtonAnimation component provides consistent animations for buttons throughout the website
 * It wraps buttons with hover, tap, and optional arrow animations
 */
const ButtonAnimation = ({
  children,
  className = '',
  color = '#D78D3A',
  hoverColor = '#F2A65A',
  hoverScale = 1.05,
  tapScale = 0.95,
  arrowAnimation = false,
  glowEffect = false,
  onClick,
}: ButtonAnimationProps) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{
        scale: hoverScale,
        boxShadow: glowEffect ? `0 0 15px rgba(215, 141, 58, 0.5)` : undefined,
      }}
      whileTap={{ scale: tapScale }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

/**
 * Arrow animation component that can be used inside buttons
 * Creates a subtle right arrow animation
 */
export const AnimatedArrow = ({ color = '#ffffff' }: { color?: string }) => {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M4 10H16M16 10L10 4M16 10L10 16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default ButtonAnimation;