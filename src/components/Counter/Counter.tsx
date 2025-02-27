import React, { useState, useEffect } from 'react';
import Button from '../UI/Button'; // Update the import path
import { FiPlus, FiMinus, FiRefreshCw } from 'react-icons/fi';

const Counter: React.FC = () => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('counter');
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem('counter', count.toString());
    console.log('Count updated:', count);
  }, [count]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '50%', margin: '0 auto' }}>
      <p style={{ textAlign: 'center', fontSize: '2em', margin: '20px 0' }}>{count}</p>
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
  );
};

export default Counter;