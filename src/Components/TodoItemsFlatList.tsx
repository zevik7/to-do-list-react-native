import { View } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { Todo } from '@/Store/TodoList'
import 'react-native-get-random-values'
import { TodoItem } from '@/Components'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  todoListId: string
  todoItems: Todo[]
}

export default function TodoItemsFlatList({ todoItems, todoListId }: Props) {
  const { Layout, Gutters } = useTheme()

  const renderTodoItem = useCallback(
    ({ item, drag }: RenderItemParams<any>) => (
      <View style={[Gutters.smallVMargin]}>
        <TouchableOpacity onLongPress={drag}>
          <TodoItem
            key={item.id}
            id={item.id}
            completed={item.completed}
            text={item.text}
            todoListId={todoListId}
          />
        </TouchableOpacity>
      </View>
    ),
    [todoItems],
  )

  return (
    <DraggableFlatList
      style={[Layout.column, Gutters.regularVMargin]}
      containerStyle={{
        flex: 1,
      }}
      contentContainerStyle={{
        flex: 1,
      }}
      data={todoItems}
      onDragEnd={({ data }) => {}}
      keyExtractor={item => item.id}
      renderItem={renderTodoItem}
    />
  )
}
