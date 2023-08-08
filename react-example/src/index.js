import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // react-redux提供Provider组件，可以让容器组件拿到state
import { store } from './store/index'
import { MyRouter, Route } from './utils/router';
import RouteDemo from './pages/routerDemo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // https://juejin.cn/post/7009189602506309640
  // https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors
  // <React.StrictMode> dev模式下会多次渲染，生产环境下不会
  <Provider store={store}>
    <ul>
      <li>
        <a href="/">首页</a>
        &emsp;
        <a href="#/2">demo 页面</a>
      </li>
    </ul>
     <MyRouter>
      <Route path='/' component={App}/>
      <Route path='/2' component={RouteDemo}/>
    </MyRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
