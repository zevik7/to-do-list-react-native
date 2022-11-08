import { Todo, TodoList } from '@/Store/TodoList'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  onValue,
  ref,
  get,
  set,
  push,
  remove,
  update,
  equalTo,
  query,
  orderByChild,
} from 'firebase/database'
import { db } from '../../firebase-config'
import { v4 as uuidv4 } from 'uuid'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['TodoLists', 'TodoList', 'Todo'],
  endpoints: builder => ({
    fetchTodoList: builder.query<any, { id: string }>({
      async queryFn({ id }) {
        try {
          const snapshot: TodoList =
            (await (await get(ref(db, '/todoLists/' + id))).val()) || {}

          const todoListData = {
            ...snapshot,
            todos: Object.keys(snapshot.todos || {}).map(
              (key: any) => snapshot.todos[key],
            ),
          }

          return { data: todoListData }
        } catch (error) {
          console.log(error)
          return { data: '' }
        }
      },
      providesTags: (result, error, arg) => [{ type: 'TodoList', id: arg.id }],
    }),
    fetchTodoLists: builder.query<any, any>({
      async queryFn({ status = 'active' }) {
        try {
          const snapshot: TodoList[] =
            (await (
              await get(
                query(
                  ref(db, '/todoLists'),
                  orderByChild('status'),
                  equalTo(status),
                ),
              )
            ).val()) || {}
          let todoListsData: TodoList[] = Object.keys(snapshot).map(
            (key: any) => ({
              ...snapshot[key],
            }),
          )

          return { data: todoListsData }
        } catch (error) {
          console.log(error)
          return { data: '' }
        }
      },
      providesTags: ['TodoLists'],
    }),
    updateTodoList: builder.mutation<string, { id: string; data: any }>({
      async queryFn({ id, data }) {
        try {
          await update(ref(db, '/todoLists/' + id), {
            ...data,
          })
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: (result, error, arg) => {
        return ['TodoLists', { type: 'TodoList', id: arg.id }]
      },
    }),
    addTodoList: builder.mutation<string, { name: string }>({
      async queryFn({ name }) {
        try {
          const id = uuidv4()
          const newTodoListData: TodoList = {
            id,
            name,
            status: 'active',
            todos: [],
          }
          await set(ref(db, '/todoLists/' + id), newTodoListData)
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: ['TodoLists'],
    }),
    removeTodoList: builder.mutation<string, { id: string }>({
      async queryFn({ id }) {
        try {
          await remove(ref(db, `/todoLists/${id}`))
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: ['TodoLists'],
    }),
    addTodo: builder.mutation<string, { todoListId: string; text: string }>({
      async queryFn({ todoListId, text }) {
        try {
          const id = uuidv4()
          const newTodo: Todo = {
            id,
            text,
            completed: false,
          }
          await set(ref(db, `/todoLists/${todoListId}/todos/${id}`), newTodo)
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'TodoList', id: arg.todoListId }]
      },
    }),
    removeTodo: builder.mutation<
      string,
      { todoListId: string; todoId: string }
    >({
      async queryFn({ todoListId, todoId }) {
        try {
          await remove(ref(db, `/todoLists/${todoListId}/todos/${todoId}`))
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'TodoList', id: arg.todoListId }]
      },
    }),
    updateTodo: builder.mutation<
      string,
      { todoListId: string; todoId: string; data: any }
    >({
      async queryFn({ todoListId, todoId, data }) {
        try {
          await update(ref(db, `/todoLists/${todoListId}/todos/${todoId}`), {
            ...data,
          })
          return { data: 'Success' }
        } catch (error) {
          console.log(error)
          return { error: true }
        }
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'TodoList', id: arg.todoListId }]
      },
    }),
    
  }),
})

export const {
  useFetchTodoListQuery,
  useFetchTodoListsQuery,
  useAddTodoListMutation,
  useUpdateTodoListMutation,
  useRemoveTodoListMutation,
  useAddTodoMutation,
  useRemoveTodoMutation,
  useUpdateTodoMutation
} = api
