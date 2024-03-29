import React, { useEffect } from 'react';

export default function useFetch(service, otpions, plugins) {
  const { manual = false, ...rest } = options;

  const fetchOptions = {
    manual,
    ...rest,
  };
  
  const serviceRef = useLatest(service); // 使用ref 进行绑定

  const update = useUpdate();

  const fetchInstance = useCreation(() => {
    const initState = plugins.map((p) => p.onInit.fetchOptions).filter(Boolean);

    return new Fetch(
      serviceRef,
      fetchOptions,
      update,
      Object.assign({}, ...initState),
    );
  }, []);
  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));

  
  let run = () => {}

  useMount(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.state.params || options.defaultParams || [];
      
      fetchInstance.run(...params);
    }
  })


  useUnmount(() => { 
    console.log('组件卸载')
    fetchInstance.cancel();
  })

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

// useCreation的作用是在组件渲染期间缓存一个固定的值, 避免重复计算
export default function useCreation(factory, deps) {
  const { current } = useRef({
    deps,
    obj: undefined,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}
