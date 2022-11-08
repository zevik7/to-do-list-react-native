import { TodoList } from '@/Store/TodoList'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { onValue, ref, get, set, push } from 'firebase/database'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  getFirestore,
} from 'firebase/firestore'
import { db } from '../../firebase-config'
import { v4 as uuidv4 } from 'uuid'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['TodoLists'],
  endpoints: builder => ({
    fetchTodoLists: builder.query<TodoList[], {}>({
      async queryFn() {
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
          const newTodoListData: TodoList = {
            id: uuidv4(),
            name,
            status: 'active',
            todos: [],
          }
          await push(ref(db, '/todoLists'), newTodoListData)
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

export const { useFetchTodoListsQuery, useAddTodoListMutation } = api
