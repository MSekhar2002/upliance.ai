import { useState, useEffect } from 'react';

interface UseCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

export const useCounter = ({
  initialValue = 0,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
}: UseCounterProps = {}) => {
  const [count, setCount] = useState<number>(initialValue);
  
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);
  
  const increment = () => {
    setCount(prevCount => Math.min(prevCount + 1, max));
  };
  
  const decrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, min));
  };
  
  const reset = () => {
    setCount(initialValue);
  };
  
  return {
    count,
    increment,
    decrement,
    reset
  };
};