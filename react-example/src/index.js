import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // react-redux提供Provider组件，可以让容器组件拿到state
import { store } from './store/index'
import { MyRouter, HistoryRouter,  Route } from './utils/router';
import RouteDemo from './pages/routerDemo';
import MobxUse from './pages/mobxUse';
import TableUse from './pages/useTable';
import Ahooks from './pages/ahooksUse';

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
        &emsp;
        <a href="/3">首页 history</a>
        &emsp;
        <a href="/4">demo 页面 history</a>
        &emsp;
        <a href="/5">mobx use</a>
        &emsp;
        <a href="/6">table use</a>
        &emsp;
        <a href="/7">ahooks use</a>
      </li>
    </ul>
     {/* <MyRouter>
      <Route path='/' component={App}/>
      <Route path='/2' component={RouteDemo}/>
    </MyRouter> */}
    <HistoryRouter>
      <Route path='/3' component={App}/>
      <Route path='/4' component={RouteDemo}/>
      <Route path='/5' component={MobxUse}/>
      <Route path='/6' component={TableUse}/>
      <Route path='/7' component={Ahooks}/>
    </HistoryRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
