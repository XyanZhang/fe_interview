import React, { useCallback } from 'react';
import Counter from './components/count';
import List from './components/list';
import ScrollTop from './components/scrollTop';
import Timer from './components/timer';
import WindowSize from './components/windowSize';

import BlogList from './components/blogList';
import ReduxUse from './components/reduxUse';
import CounterRenderPropsExample from './components/renderProps';
import FormExample from './components/form';
import NiceModalExample from './components/niceModal';

// 为什么不直接定义全局的数据，而是使用context？
// 因为全局的修改不会自动更新组件，而context会渲染使用到的组件
// Context这一机制，让React应用具备定义全局的响应式数据的能力，正如Redux，也是利用这一机制实现的。
export let myContext = React.createContext();

function App() {
  const [count, setCount] = React.useState(0);
  const changeContextValue = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  console.log(1111)
  return (
    <div className="App" style={{display: 'flex',}}>
      <div className='w-50p'>
        <NiceModalExample></NiceModalExample>
        {/* 计数 */}
        <Counter></Counter>
        {/* renderProps 计数 */}
        <CounterRenderPropsExample></CounterRenderPropsExample>
        {/* 计时器 */}
        <myContext.Provider value={{name: count}}>
          <button style={{color:'red'}} onClick={changeContextValue}>修改context</button>
          <Timer></Timer>
        </myContext.Provider>
        <List></List>
        {/* <hr></hr> */}
        <ScrollTop></ScrollTop>
        <hr></hr>
        {/* 屏幕变化 */}
        <WindowSize></WindowSize>
      </div>
      <div className='w-50p'>
        <BlogList></BlogList>
        <ReduxUse></ReduxUse>
        <FormExample></FormExample>
      </div>


    </div>
  );
}

export default App;
