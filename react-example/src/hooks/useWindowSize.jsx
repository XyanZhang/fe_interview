import { useState, useEffect } from "react";

const getSize = () => {
  return window.innerWidth > 1000 ? 'large' : 'small';
}

export const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  return size;
}