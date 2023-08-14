import { makeObservable, observable, computed, action, autorun } from "mobx";
class ObservableTodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed, // 调用该属性get时，会自动调用该方法
      report: computed,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() {
    if (this.todos.length === 0)
      return "<无>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `下一个待办："${nextTodo ? nextTodo.task : "<无>"}"。 ` +
      `进度：${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

export const observableTodoStore = new ObservableTodoStore();