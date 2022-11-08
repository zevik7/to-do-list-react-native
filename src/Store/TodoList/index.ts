import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todoList',
  initialState: {
    todoLists: [],
  } as TodoListState,
  reducers: {},
})

export default slice.reducer

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type TodoListStatus = 'active' | 'archive'

export type TodoList = {
  id: string
  name: string
  status: TodoListStatus
  todos: Todo[]
}

export type TodoListState = {
  todoLists: TodoList[]
}
