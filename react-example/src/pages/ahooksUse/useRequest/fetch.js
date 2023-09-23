export default class Fetch {
  state = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    }
  }

  run(...params) {
    // 调用runAsync
    this.runAsync(...params).catch(err => {
      if(!this.options.onError) {
        console.error(error)
      }
    })
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
        servicePromise = this.serviceRef.current(...params);
      }
      const res = await servicePromise;
      if(currentCount !== this.count) {
        return new Promise(() => {});
      }

      

    } catch (error) {
      
    }
  }
}