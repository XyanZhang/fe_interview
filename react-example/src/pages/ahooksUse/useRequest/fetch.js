export default class Fetch {
  // 插件执行后返回的方法列表
  pluginImpls = [];

  count = 0;

  state = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined
  }

  constructor(serviceRef, options, subscribe, initState) {
    this.serviceRef = serviceRef;
    this.options = options;
    this.subscribe = subscribe;
    this.initState = initState;
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    }
  }

  setState(s = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  }
// run 是一个普通的同步函数，其内部也是调用了 runAsync 方法, 只不过进行了异常捕获
  run(...params) {
    // 调用runAsync
    this.runAsync(...params).catch(err => {
      if(!this.options.onError) {
        console.error(error)
      }
    })
  }
  // 执行插件中的某个事件（event），rest 作为参数传入
  runPluginHandler(event, ...rest) {
    const r = this.pluginImpls.map((i) => i[event](...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params) {
    this.count += 1;
    const currentCount = this.count;
    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler("onBefore", params);

    // stop request
    if(stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });
    // return now 
    if(returnNow) {
      return Promise.resolve(state.data)
    }

    this.options.onBefore(params);

    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);
      if(!servicePromise) {
        servicePromise = this.serviceRef.current(...params); // 请求调用
      }
      const res = await servicePromise;
      if(currentCount !== this.count) {
        return new Promise(() => {});
      }

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });

      this.options.onSuccess(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }

      return res;

    } catch (error) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        error,
        loading: false,
      });

      this.options.onError(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    
    }
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });

    this.runPluginHandler('onCancel');
  }

  refresh() {
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data) {
    const targetData = isFunction(data) ? data(this.state.data) : data;
    this.runPluginHandler('onMutate', targetData);
    this.setState({
      data: targetData,
    });
  }
} 