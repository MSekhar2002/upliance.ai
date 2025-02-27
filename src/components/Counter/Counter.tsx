import React, { useState, useEffect, useRef } from 'react';
import Button from '../UI/Button';
import { FiPlus, FiMinus, FiRefreshCw } from 'react-icons/fi';

const Counter: React.FC = () => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('counter');
    return savedCount ? parseInt(savedCount) : 0;
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(300); // Default height
  
  useEffect(() => {
    // Set the maximum possible height based on container size
    if (containerRef.current) {
      setMaxHeight(containerRef.current.clientHeight);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        setMaxHeight(containerRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('counter', count.toString());
    console.log('Count updated:', count);
    console.log('maxHeight:', maxHeight);
  }, [count]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => setCount(0);
  
  // Calculate background height percentage (0-100%)
  // The height increases non-linearly using a bezier-like function
  const calculateHeight = () => {
    // For very large numbers, we'll use a logarithmic scale
    if (count === 0) return 0;
    
    const basePercentage = Math.min(count * 5, 100); // Linear increase until count = 20
    
    // Apply a cubic bezier-like function to create a curved progression
    // This formula approximates a bezier curve: f(x) = 3x² - 2x³
    const x = basePercentage / 100;
    const bezierY = 3 * Math.pow(x, 2) - 2 * Math.pow(x, 3);
    
    return bezierY * 100;
  };
  
  // Calculate background color based on count
  // Color transitions from blue to purple to red as count increases
  const calculateColor = () => {
    const percentage = calculateHeight() / 100;
    
    if (percentage <= 0.5) {
      // Blue to purple (hsl: 240 -> 270)
      const hue = 240 + (percentage * 2 * 30);
      return `hsl(${hue}, 70%, 60%)`;
    } else {
      // Purple to red (hsl: 270 -> 0)
      const hue = 270 - ((percentage - 0.5) * 2 * 270);
      return `hsl(${hue}, 70%, 60%)`;
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative',
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        maxWidth: '50%', 
        margin: '0 auto',
        overflow: 'hidden',
        minHeight: '200px'
      }}
    >
      {/* Dynamic background that grows with count */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${calculateHeight()}%`,
          backgroundColor: calculateColor(),
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease',
          zIndex: 0
        }}
      />
      
      {/* Content positioned above the background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '2em', 
          margin: '20px 0',
          fontWeight: 'bold',
          textShadow: count > 5 ? '0px 0px 3px rgba(255,255,255,0.7)' : 'none'
        }}>
          {count}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="primary" 
            icon={<FiMinus />}
            onClick={decrement}
            disabled={count === 0}
            aria-label="Decrement counter"
          >
            Decrease
          </Button>
          <Button
            variant="danger" 
            icon={<FiRefreshCw />}
            onClick={reset}
            aria-label="Reset counter"
          >
            Reset
          </Button>
          <Button
            variant="primary" 
            icon={<FiPlus />}
            onClick={increment}
            aria-label="Increment counter"
          >
            Increase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Counter;