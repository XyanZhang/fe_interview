import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // https://juejin.cn/post/7009189602506309640
  // https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors
  // <React.StrictMode> dev模式下会多次渲染，生产环境下不会
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
