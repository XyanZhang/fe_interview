import React from 'react'
import { observableTodoStore } from './store'
import { TodoList } from './mobx'
export default function MobxUse() {
  return (
    <TodoList store={ observableTodoStore } />
  )
}