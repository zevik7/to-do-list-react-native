import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useSelector } from 'react-redux'
import { TodoList } from '@/Store/TodoList'
import TodoListItem from '@/Components/TodoListItem'
import { shallowEqual } from 'react-redux'

const TodoListsFlatList = ({ onlyShowArchive = false }) => {
  const todoLists: TodoList[] = useSelector((state: any) =>
    state.todoLists.todoLists.filter(
      (tl: TodoList) => tl.status === (onlyShowArchive ? 'archive' : 'active'),
      shallowEqual
    ),
  )
  const { Gutters, Layout } = useTheme()

  const renderItem = useCallback(
    ({ item }: { item: TodoList }) => (
      <TodoListItem id={item.id} name={item.name} todos={item.todos} />
    ),
    [todoLists],
  )

  return (
    <FlatList
      style={[
        Layout.column,
        Gutters.smallHPadding,
        Gutters.smallVPadding,
        Layout.fullWidth,
      ]}
      data={todoLists}
      renderItem={renderItem}
    />
  )
}

export default TodoListsFlatList
