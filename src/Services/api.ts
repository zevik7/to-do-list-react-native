import { TodoList, TodoListStatus } from '@/Store/TodoList'
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
  tagTypes: ['TodoLists', 'TodoList'],
  endpoints: builder => ({
    fetchTodoList: builder.query<TodoList, { id: string }>({
      async queryFn({ id }) {
        const todoListData: TodoList = await (
          await get(ref(db, '/todoLists/' + id))
        ).val()

        return { data: todoListData }
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
  }),
})

export const {
  useFetchTodoListQuery,
  useFetchTodoListsQuery,
  useAddTodoListMutation,
  useUpdateTodoListMutation,
  useRemoveTodoListMutation,
} = api
