import { createSlice } from '@reduxjs/toolkit'
import { store } from '..'

const slice = createSlice({
  name: 'todoList',
  initialState: {
    todoLists: [
      {
        id: '1',
        name: 'Todo list 1',
        status: 'active',
        todos: [
          {
            id: '1',
            text: 'doing something',
            completed: false,
          },
          {
            id: '2',
            text: 'doing something 2',
            completed: false,
          },
        ],
      },
      {
        id: '2',
        name: 'Todo list 2',
        status: 'active',
        todos: [
          {
            id: '1',
            text: 'doing something',
            completed: false,
          },
          {
            id: '2',
            text: 'doing something 2',
            completed: false,
          },
        ],
      },
    ],
  } as TodoListState,
  reducers: {
    addList: (
      state: TodoListState,
      { payload: { todoList } }: { payload: { todoList: TodoList } },
    ) => {
      state.todoLists.push(todoList)
    },
    removeList: (
      state: TodoListState,
      { payload: { todoListId } }: { payload: { todoListId: string } },
    ) => {
      state.todoLists = state.todoLists.filter(
        (todoList: TodoList) => todoListId !== todoList.id,
      )
    },
    changeListStatus: (
      state: TodoListState,
      {
        payload: { todoListId, status },
      }: { payload: { todoListId: string; status: TodoListStatus } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          state.todoLists[i].status = status
          break
        }
      }
    },
    addTodo: (
      state: TodoListState,
      {
        payload: { todoListId, todo },
      }: { payload: { todoListId: string; todo: Todo } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          state.todoLists[i].todos.push(todo)
          break
        }
      }
    },
    updateTodos: (
      state: TodoListState,
      {
        payload: { todoListId, todos },
      }: { payload: { todoListId: string; todos: Todo[] } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          state.todoLists[i].todos = todos
          break
        }
      }
    },
    updateTodoText: (
      state: TodoListState,
      {
        payload: { todoListId, todoId, newText },
      }: { payload: { todoListId: string; todoId: string; newText: string } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          for (let j = 0; j < state.todoLists[i].todos.length; j++) {
            if (todoId === state.todoLists[i].todos[j].id) {
              state.todoLists[i].todos[j].text = newText
              break
            }
          }
          break
        }
      }
    },
    deleteTodo: (
      state: TodoListState,
      {
        payload: { todoListId, todoId },
      }: { payload: { todoListId: string; todoId: string } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          for (let j = 0; j < state.todoLists[i].todos.length; j++) {
            if (todoId === state.todoLists[i].todos[j].id) {
              state.todoLists[i].todos.splice(j, 1)
              break
            }
          }
          break
        }
      }
    },
    toggleTodo: (
      state: TodoListState,
      {
        payload: { todoListId, todoId },
      }: { payload: { todoListId: string; todoId: string } },
    ) => {
      for (let i = 0; i < state.todoLists.length; i++) {
        if (todoListId === state.todoLists[i].id) {
          for (let j = 0; j < state.todoLists[i].todos.length; j++) {
            if (todoId === state.todoLists[i].todos[j].id) {
              state.todoLists[i].todos[j].completed =
                !state.todoLists[i].todos[j].completed
              break
            }
          }
          break
        }
      }
    },
  },
})

export const {
  addList,
  changeListStatus,
  removeList,
  addTodo,
  updateTodos,
  updateTodoText,
  deleteTodo,
  toggleTodo,
} = slice.actions

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
