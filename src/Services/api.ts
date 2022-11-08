import { TodoList } from '@/Store/TodoList'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { onValue, ref, get, set, push, remove } from 'firebase/database'
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
      providesTags: ['TodoLists'],
    }),
    fetchTodoLists: builder.query<TodoList[], { onlyArchive: boolean }>({
      async queryFn({ onlyArchive }) {
        const snapshot: any = await (await get(ref(db, '/todoLists'))).val()
        const todoListsData: TodoList[] = Object.keys(snapshot).map(
          (key: string) => ({
            ...snapshot[key],
          }),
        )

        return { data: todoListsData }
      },
      providesTags: ['TodoLists'],
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
  useRemoveTodoListMutation,
} = api
