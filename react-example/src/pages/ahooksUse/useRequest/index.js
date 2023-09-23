import React, { useEffect } from 'react';

export default function useFetch(service, otpions) {

  let run = () => {}

  useMount(() => {

  })

  const update = useUpdate();

  return {
    loading: '',
    data: [],
    error: null,
    run: run
  }
}

const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

// 组件卸载时 执行fn
const useUnmount = (fn) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  // 这样实现的好处是，无论fn是否发生变化，都可以保证在组件卸载时执行最新的fn函数。
  const fnRef = useLatest(fn);

  useEffect(() => {
    return () => {
      // 组件卸载时调用
      fnRef.current();
    }
  },[]);
};

// 更新ref
const useLatest= () => {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

// 强制重新渲染组件，即使没有其他变化
const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};