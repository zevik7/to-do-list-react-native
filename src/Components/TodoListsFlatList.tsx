import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useSelector } from 'react-redux'
import { TodoList } from '@/Store/TodoList'
import TodoListItem from '@/Components/TodoListItem'

const TodoListsFlatList = () => {
  const todoLists: TodoList[] = useSelector(
    (state: any) => state.todoLists.todoLists,
  )
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  const renderItem = useCallback(
    ({ item }: { item: TodoList }) => (
      <TodoListItem
        listId={item.id}
        name={item.name}
        totalTodosLength={item.todos.length}
        totalcompletedTodos={1}
      />
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
