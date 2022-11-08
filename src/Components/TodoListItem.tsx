import React, { useMemo } from 'react'
import { View, Text, Pressable, LayoutAnimation } from 'react-native'
import { useTheme } from '@/Hooks'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { TabStackParamList } from '@/Navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Application'
import { Todo } from '@/Store/TodoList'
import { useDispatch } from 'react-redux'
import { translate } from '@/Translations'

export type TodoListItemNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList, 'TodoListModal'>
>

type Props = {
  id: string
  name: string
  todos: Todo[]
}

const maxPan = 80

const TodoListItem = ({ id, name, todos }: Props) => {
  const { Fonts, Gutters, Layout, Colors } = useTheme()
  const navigation = useNavigation<TodoListItemNavigationProps>()
  const dispatch = useDispatch()
  const route = useRoute()

  const totalCompletedTodos = useMemo(() => {
    return todos?.length && todos.reduce((prev, current) => {
      return prev + (current.completed ? 1 : 0)
    }, 0)
  }, [todos])

  return (
    <Pressable
      onPress={() => navigation.navigate('TodoListModal', { todoListId: id })}
    >
        <View
          style={[
            Gutters.regularVPadding,
            Gutters.regularHPadding,
            Gutters.regularBMargin,
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            {
              borderWidth: 1,
              borderColor: 'rgb(220,220,220)',
              borderRadius: 10,
            },
          ]}
        >
          <Text style={[Fonts.textRegular]}>{name}</Text>
          {todos?.length ? (
            <Text style={[Fonts.textSmall]}>
              {totalCompletedTodos}/{todos.length} {translate("status.completed", "")}
            </Text>
          ) : null}
        </View>
    </Pressable>
  )
}

export default TodoListItem
