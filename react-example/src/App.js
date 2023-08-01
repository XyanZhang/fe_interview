import Counter from './components/count';
import WindowSize from './components/windowSize';

function App() {
  return (
    <div className="App">
      {/* 计数 */}
      <Counter></Counter>
      {/* 屏幕变化 */}
      <WindowSize></WindowSize>
    </div>
  );
}

export default App;
