import React from "react";
import { observer } from "mobx-react";



let TodoListOrigin = ({store}) => {
  const onNewTodo = () => {
    store.addTodo(prompt('输入新的待办：','请来杯咖啡'));
  }

  return (
    <div>
      { store.report }
      <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      { store.pendingRequests > 0 ? <marquee>正在加载……</marquee> : null }
      <button onClick={ onNewTodo }>新待办</button>
      <small>（双击待办进行编辑）</small>
      {/* <RenderCounter /> */}
    </div>
  ); 
}

// observer：将组件转换为响应式组件，当组件内部使用到的observable发生变化时，组件会自动重新渲染
export const TodoList = observer(TodoListOrigin);

export const TodoView = observer(({todo}) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }

  const onRename = () => {
    todo.task = prompt('任务名称', todo.task) || todo.task;
  }

  return (
    <li onDoubleClick={ onRename }>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee.name }</small>
        : null
      }
      {/* <RenderCounter /> */}
    </li>
  );
})