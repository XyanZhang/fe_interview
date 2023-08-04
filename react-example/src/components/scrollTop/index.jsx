import React, { useCallback } from "react";
import { useScroll } from "../../hooks";

const style = {
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  width: '50px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  background: '#ccc',
  borderRadius: '50%',
  cursor: 'pointer',
}

function ScrollTop(props) {
  const { x, y } = useScroll();

  const goTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      {
        y > 300 && <button style={style} onClick={goTop}>GO TOP</button>
      }
      <div style={{position: 'fixed',top: 0, right: 0,width: '180px',height: '40px',background: 'lightgrey'}}>
        滚动位置：x: {x}, y: {y}
      </div>
    </>
  )
}

export default ScrollTop;