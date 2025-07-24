import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import EnhancedCursor from './EnhancedCursor';

interface AnimationContextType {
  enableParallax: boolean;
  enablePageTransitions: boolean;
  enableCustomCursor: boolean;
  animationIntensity: 'low' | 'medium' | 'high';
  toggleParallax: () => void;
  togglePageTransitions: () => void;
  toggleCustomCursor: () => void;
  setAnimationIntensity: (intensity: 'low' | 'medium' | 'high') => void;
}

const defaultContext: AnimationContextType = {
  enableParallax: true,
  enablePageTransitions: true,
  enableCustomCursor: true,
  animationIntensity: 'medium',
  toggleParallax: () => {},
  togglePageTransitions: () => {},
  toggleCustomCursor: () => {},
  setAnimationIntensity: () => {},
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
  initialSettings?: Partial<AnimationContextType>;
}

/**
 * AnimationProvider component provides a central place to manage animations throughout the website
 * It includes settings for parallax effects, page transitions, custom cursor, and animation intensity
 */
export const AnimationProvider = ({
  children,
  initialSettings = {},
}: AnimationProviderProps) => {
  // Combine default settings with any initial settings provided
  const [enableParallax, setEnableParallax] = useState(
    initialSettings.enableParallax ?? defaultContext.enableParallax
  );
  const [enablePageTransitions, setEnablePageTransitions] = useState(
    initialSettings.enablePageTransitions ?? defaultContext.enablePageTransitions
  );
  const [enableCustomCursor, setEnableCustomCursor] = useState(
    initialSettings.enableCustomCursor ?? defaultContext.enableCustomCursor
  );
  const [animationIntensity, setAnimationIntensityState] = useState<'low' | 'medium' | 'high'>(
    initialSettings.animationIntensity ?? defaultContext.animationIntensity
  );

  // Check if user has reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnableParallax(false);
      setAnimationIntensityState('low');
    }
  }, []);

  // Toggle functions
  const toggleParallax = () => setEnableParallax(prev => !prev);
  const togglePageTransitions = () => setEnablePageTransitions(prev => !prev);
  const toggleCustomCursor = () => setEnableCustomCursor(prev => !prev);
  const setAnimationIntensity = (intensity: 'low' | 'medium' | 'high') => {
    setAnimationIntensityState(intensity);
  };

  const value = {
    enableParallax,
    enablePageTransitions,
    enableCustomCursor,
    animationIntensity,
    toggleParallax,
    togglePageTransitions,
    toggleCustomCursor,
    setAnimationIntensity,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
      <EnhancedCursor 
        enabled={enableCustomCursor}
        trailEffect={animationIntensity !== 'low'}
        size={animationIntensity === 'high' ? 10 : 8}
        ringSize={animationIntensity === 'high' ? 50 : 40}
      />
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;