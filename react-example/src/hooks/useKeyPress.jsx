import { useEffect, useState } from "react";

// react17之前，所有事件都是绑定在document 上的，react17之后，所有事件都是绑定在rootContainer上的 （浏览器事件冒泡机制）

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
export default useKeyPress;