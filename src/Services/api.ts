import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchTodoLists: builder.query({
      async queryFn() {
        try {
          const userRef = collection(db, "todolist");
          const querySnapshot = await getDocs(userRef);
          let todoListsData: any = [];
          querySnapshot?.forEach((todoList) => {
            todoListsData.push({
              id: todoList.id,
              ...todoList.data(),
            });
          });
          return { data: todoListsData };
        } catch (err) {
          console.log("err", err);
          return { error: err };
        }
      },
    }),
  }),
});

export const {
  useFetchTodoListsQuery
} = api;