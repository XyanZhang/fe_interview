// Libuv 事件循环具体在 uv_run 函数中实现。uv_run 中执行 while 循环，
// 然后串行处理各种阶段（phase）的事件回调，
// 所以当一个任务执行时间过长，就会影响后面任务的执行，导致事件循环延迟过高

int uv_run(uv_loop_t* loop, uv_run_mode mode) {
    int timeout;
    int r;
    int ran_pending;
    while (r != 0 && loop->stop_flag == 0) {
        // 更新当前时间，每轮事件循环会缓存这个时间，避免过多系统调用损耗性能
        uv__update_time(loop);
        // 执行定时器回调
        uv__run_timers(loop);
        // 执行 pending 回调
        uv__run_pending(loop);
        // 继续执行各种队列
        uv__run_idle(loop);
        uv__run_prepare(loop);
        timeout = 0;
        // 计算 Poll IO 阻塞时间
        timeout = uv_backend_timeout(loop);
        // Poll IO timeout是 epoll_wait 的等待时间
        uv__io_poll(loop, timeout);
        // 继续执行各种队列
        uv__run_check(loop);
        uv__run_closing_handles(loop);
        // 是否还有活跃任务，有则继续下一轮事件循环
        r = uv__loop_alive(loop);
    }
    return r;
}

static int uv__loop_alive(const uv_loop_t* loop) {
  return uv__has_active_handles(loop) ||
         uv__has_active_reqs(loop) ||
         loop->closing_handles != NULL;
}

/* 
1.  prepare、check、idle 阶段

2.  pending 阶段
    pending 阶段用于处理 Poll IO 阶段产生的一些回调，比如连接失败时的回调或者 UDP 数据发送结束的写回调 

3.  close 阶段
    close 是 Libuv 每轮事件循环中最后的一个阶段。对于一个 handle，有四个通用的操作函数，分别是 init、start、stop 和 close

4.  timer 阶段

5.  Poll IO 阶段(最重要、最复杂)
    网络 IO、线程池完成任务、信号处理等回调都是在这个阶段处理的
    本质上是对各个操作系统事件驱动模块的封装

    最重要的数据结构 IO 观察者
    struct uv__io_s {
      // 事件触发后的回调
      uv__io_cb cb;
      // 用于插入队列
      void* pending_queue[2];
      void* watcher_queue[2];
      // 保存当前感兴趣的事件，还没有同步的操作系统。每次设置时首先保存事件在这个字段，然后 Poll IO 阶段再操作事件驱动模块更新到操作系统
      unsigned int pevents; 
      // 保存更新到操作系统的事件，每次 Poll IO 阶段更新 pevents 的值到操作系统后就把 pevents 同步到 events
      unsigned int events;
      // 标记对哪个文件描述符的事件感兴趣
      int fd;
    };


*/