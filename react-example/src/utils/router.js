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