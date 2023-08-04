import { useEffect, useState } from "react";

const useKeyPress = (domNode = document.body) => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const handleKeyPress = (e) => {
      setKey(e.keyCode);
    };
    domNode.addEventListener("keydown", handleKeyPress);
    return () => {
      domNode.removeEventListener("keydown", handleKeyPress);
    };
  },[domNode]);
  return key;
}