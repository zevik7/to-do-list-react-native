import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useSelector } from 'react-redux'
import { TodoList, TodoListState } from '@/Store/TodoList'
import TodoListItem from '@/Components/TodoListItem'
import { shallowEqual } from 'react-redux'
import { RootState } from '@/Store'
import { onValue, ref } from 'firebase/database'
import { db } from '@/../firebase-config'
import { useFetchTodoListsQuery } from '@/Services/api'

const TodoListsFlatList = ({ onlyShowArchive = false }) => {
  const { data, isLoading } = useFetchTodoListsQuery({})

  const { Gutters, Layout } = useTheme()

  const renderItem = useCallback(
    ({ item }: { item: TodoList }) => (
      <TodoListItem id={item.id} name={item.name} todos={item.todos} />
    ),
    [data],
  )

  return (
    <FlatList
      style={[
        Layout.column,
        Gutters.smallHPadding,
        Gutters.smallVPadding,
        Layout.fullWidth,
      ]}
      data={data}
      renderItem={renderItem}
    />
  )
}

export default TodoListsFlatList
