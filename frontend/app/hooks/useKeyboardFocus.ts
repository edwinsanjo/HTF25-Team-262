import { useState, useEffect } from 'react';

export default function useKeyboardFocus() {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isUsingKeyboard;
}