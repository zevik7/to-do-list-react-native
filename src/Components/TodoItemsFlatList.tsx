import { FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { Todo } from '@/Store/TodoList'
import 'react-native-get-random-values'
import { TodoItem } from '@/Components'

type Props = {
  todoListId: string
  todoItems: Todo[]
}

export default function TodoItemsFlatList({ todoItems, todoListId }: Props) {
  const { Layout, Gutters } = useTheme()

  const renderTodoItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem
        key={item.id}
        id={item.id}
        completed={item.completed}
        text={item.text}
        todoListId={todoListId}
      />
    ),
    [todoItems],
  )

  return (
    <FlatList
      data={todoItems}
      renderItem={renderTodoItem}
      style={[Layout.column, Gutters.regularVMargin]}
    />
  )
}
