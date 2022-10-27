import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todoList',
  initialState: {
    todoLists: [
      {
        id: '1',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '12',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '1123',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '123451',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '341',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '51',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '13345',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '131345',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '113345',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
      {
        id: '132345',
        name: 'Todo list 1',
        status: 'active',
        todos: [],
      },
    ],
  } as TodoListState,
  reducers: {
    addList: (state, { payload: { todoList } }) => {
      state.todoLists.push(todoList)
    },
    removeList: (state, { payload: { todoListId } }) => {
      state.todoLists.filter(todoList => todoListId !== todoList.id)
    },
    addTodo: (state, { payload: { todoListId, todo } }) => {
      const newLists = state.todoLists.map(todoList =>
        todoListId === todoList.id
          ? {
              id: todoListId,
              name: todoList.name,
              status: todoList.status,
              todos: [...todoList.todos, todo],
            }
          : todoList,
      )

      state.todoLists = newLists
    },
    deleteTodo: (state, { payload: { todoListId, todoId } }) => {
      const newLists = state.todoLists.map(todoList =>
        todoListId === todoList.id
          ? {
              id: todoListId,
              name: todoList.name,
              status: todoList.status,
              todos: todoList.todos.filter(todo => todoId !== todo.id),
            }
          : todoList,
      )

      state.todoLists = newLists
    },
    toggleTodo: (state, { payload: { todoListId, todoId } }) => {
      const newLists = state.todoLists.map(todoList => {
        if (todoListId === todoList.id) {
          const newTodos = todoList.todos.map(todo => {
            if (todo.id === todoId) {
              return {
                id: todo.id,
                text: todo.text,
                completed: !todo.completed,
              }
            }

            return todo
          })

          return {
            ...todoList,
            todos: newTodos,
          }
        }

        return todoList
      })

      state.todoLists = newLists
    },
  },
})

export const { addList, addTodo, deleteTodo, toggleTodo } = slice.actions

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

type ThemePayload = {
  payload: {
    todoId: string
    todo: Todo
    todoListId: string
    todoList: TodoList
  }
}
