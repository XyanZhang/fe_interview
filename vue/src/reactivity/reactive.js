import { mutableHandlers } from './baseHandlers';
import { isObject } from '../shared/index';

export function reactive(target){
  return createReactiveObject(target,false,mutableHandlers)
}

let readonlyMap = new WeakMap();
let reactiveMap = new WeakMap();

function createReactiveObject(target, isReadonly, baseHandlers) {
  if (!isObject(target)) {
    return target
  }
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy
}