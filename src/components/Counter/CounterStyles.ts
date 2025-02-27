import { keyframes } from '@emotion/react';

export const buttonHoverScale = {
  transform: 'scale(1.05)',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

export const getBackgroundHeight = (count: number): string => {
  // Bezier curve for non-linear height growth
  // Starts slower, then accelerates
  const normalizedHeight = Math.min(count / 100, 1); // Cap at 100
  // Bezier curve calculation (cubic bezier)
  const t = normalizedHeight;
  const p0 = 0;
  const p1 = 0.1;
  const p2 = 0.5;
  const p3 = 1;
  
  const height = (1-t)**3 * p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3;
  return `${Math.max(height * 100, 1)}%`; // Minimum 1% so it's visible at 0
};

export const getBackgroundColor = (count: number): string => {
  // Gradient based on count value
  const hue = Math.min(count * 2.4, 240); // Ranging from 0 (red) to 240 (blue)
  return `hsl(${hue}, 80%, 60%)`;
};

export const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
`;