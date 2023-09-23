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

// 挂载取消
const useUnmount = (fn) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(() => () => {
    fnRef.current();
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