import Counter from './components/count';
import Timer from './components/timer';
import WindowSize from './components/windowSize';

function App() {
  return (
    <div className="App">
      {/* 计数 */}
      <Counter></Counter>
      {/* 计时器 */}
      <Timer></Timer>
      {/* 屏幕变化 */}
      <WindowSize></WindowSize>
    </div>
  );
}

export default App;
