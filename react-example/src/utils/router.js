import React, { useState, useEffect } from 'react';
export const MyRouter = ({children}) => {
  /* 
    <MyRouter>
      <Route path='/' component={app}/>
      <Route path='/'/>
    </MyRouter>
  */
 let routes = {};
  children.forEach(child => {
    const { path, component } = child.props
    path && (routes[path] = { component })
  });
  let [ hash ] = useHash();
  hash = hash || '#/';
  const Page = routes[hash.replace('#', '')].component;
  return Page ? <Page /> : 'not found';
}

export const Route = () => null;

const useHash = () => {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setHash(window.location.hash);
    })
  }, [])
  return [hash, setHash];
}

// history模式
export const HistoryRouter = ({children}) => {
  let routes = {};
  children.forEach(child => {
    const { path, component } = child.props
    path && (routes[path] = { component })
  });
  console.log(routes)
  let [ path ] = usePath();
  console.log(path)
  path = path || '/';
  if(!routes[path]) {
    return 'not found';
  } 
  const Page = routes[path].component;
  return Page ? <Page /> : 'not found';
}

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    window.addEventListener('popstate', () => {
      setPath(window.location.pathname);
    })
  }, [])
  return [path, setPath];
}