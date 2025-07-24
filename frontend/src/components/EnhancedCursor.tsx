import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  ringColor?: string;
  trailEffect?: boolean;
  enabled?: boolean;
}

const EnhancedCursor = ({
  color = '#D78D3A',
  size = 8,
  ringSize = 40,
  ringColor = 'rgba(215, 141, 58, 0.2)',
  trailEffect = true,
  enabled = true,
}: EnhancedCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    if (!enabled) return;
    
    // Show cursor only after it has moved (prevents initial flash at 0,0)
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail with decreasing opacity
      if (trailEffect && e.movementX !== 0 && e.movementY !== 0) {
        setTrail(prev => [
          { x: e.clientX, y: e.clientY, opacity: 0.5 },
          ...prev.slice(0, 5).map(point => ({ ...point, opacity: point.opacity * 0.8 }))
        ]);
      }

      // Check if cursor is over an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = [
        'BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'
      ].includes(target.tagName) || 
      target.classList.contains('interactive') ||
      window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isInteractive);
    };

    // Track mouse clicks
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, trailEffect]);

  if (!isVisible || !enabled) return null;

  return (
    <>
      {/* Trail effect */}
      {trailEffect && trail.map((point, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-50"
          style={{
            left: point.x,
            top: point.y,
            opacity: point.opacity,
            backgroundColor: color,
            width: size / 2,
            height: size / 2,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: color,
          width: isClicking ? size * 0.8 : size,
          height: isClicking ? size * 0.8 : size,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isClicking ? 1.5 : 1,
          opacity: isPointer ? 0.5 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          borderColor: ringColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.8 : 0.4,
          width: isPointer ? ringSize * 1.2 : ringSize,
          height: isPointer ? ringSize * 1.2 : ringSize,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};

export default EnhancedCursor;