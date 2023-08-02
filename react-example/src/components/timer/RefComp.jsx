import React, { useRef,useState } from 'react';
import Counter from '../count/index';


function RefComp(props, ref) {
  const [inputValue, setInputValue] = useState('初始值'); //
  const inputRef = useRef(); // 获取dom元素
  return (
    <div className="App">
      {/* 计数 */}
      <Counter title={"使用ref的组件"}></Counter>
      <p><input ref={inputRef} type="text" value={inputValue}/></p>
      <p>
        {/* ref: 获取对真实dom的引用，不能作用与components */}
        ref输入框：<input ref={ref} type="text" value={inputValue}/>
        <button onClick={() => setInputValue('更新后的值')}>更新</button>
      </p>
    </div>
  );
}

export default React.forwardRef(RefComp); // 将内部 ref 转发到外层
