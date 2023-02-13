import { isArray, isIntegerKey, hasOwn, hasChanged } from "../shared/index";
import { track, trigger } from "./effect";

const get = createGetter();
const set = createSetter();

export let TrackOpTypes = {
  GET: 'get',
}

export let TriggerOrTypes = {
  ADD: 'add',
  SET: 'set',
}

export const mutableHandlers = {
  get,
  set
}

function createGetter(isReadonly = false, shallow = false) { // 拦截获取功能, 默认不是只读，不是浅层
  return function get(target, key, receiver) { 
    let res = Reflect.get(...arguments);  // target[key];
    // let res = Reflect.get(target, key, receiver); 
    if(!isReadonly){
      // 收集依赖，等会数据变化后更新对应的视图
      console.log('执行effect时会取值','收集effect')
      
      track(target,TrackOpTypes.GET,key); // 收集依赖, 每次属性.get都会收集一次, 保留了属性名和对应target的映射关系
    }
    if(shallow){
      return res;
    }
    return res;
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]; // 获取老的值

    // 如果是数组，需要对数组的索引进行拦截
    // 不是数组，或者是数组，但是不是索引，就直接赋值
    let hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target,key);

    // const result = Reflect.set(...arguments);
    const result = Reflect.set(target, key, value, receiver); // target[key] = value

    // 我们要区分是新增的 还是修改的  vue2 里无法监控更改索引，无法监控数组的长度变化  -》 hack的方法 需要特殊处理
    if(!hadKey){ // 
      // 新增 
      trigger(target,TriggerOrTypes.ADD,key,value);
    }else if(hasChanged(oldValue,value)){
      // 修改 
      trigger(target,TriggerOrTypes.SET,key,value,oldValue)
    }

     // 当数据更新时 通知对应属性的effect重新执行

    return result;
  }
}