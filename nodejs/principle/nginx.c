// version 1.23.1
static void ngx_worker_process_cycle(ngx_cycle_t *cycle, void *data)
{
    // 事件循环
    for ( ;; ) {
        // 是否需要退出
        if (ngx_exiting) {
            // 是否还有定时器节点，有的话需要先处理再退出
            if (ngx_event_no_timers_left() == NGX_OK) {
                ngx_worker_process_exit(cycle);
            }
        }
        // 处理定时器和其他事件
        ngx_process_events_and_timers(cycle);
    }
}

//  ngx_process_events_and_timers
void ngx_process_events_and_timers(ngx_cycle_t *cycle)
{
    // 找到最快到期的定时器
    timer = ngx_event_find_timer();
    // 调用事件驱动模块等待就绪事件或者定时器超时
    (void) ngx_process_events(cycle, timer, flags);
    // 处理事件
    ngx_event_process_posted(cycle, &ngx_posted_accept_events);

    // 处理过期的定时器
    ngx_event_expire_timers();
    
    // 处理事件
    ngx_event_process_posted(cycle, &ngx_posted_events);
}