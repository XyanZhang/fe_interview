import { useEffect, useState } from "react";

const getPosition = () => {
  return {
    x: document.body.scrollX || window.scrollX,
    y: document.body.scrollY ||window.scrollY,
  };
};

export const useScroll = () => {
  const [ position, setPosition ] = useState(getPosition());
  useEffect(() => {
    const handleScroll = () => {
      setPosition(getPosition());
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  return position;
}