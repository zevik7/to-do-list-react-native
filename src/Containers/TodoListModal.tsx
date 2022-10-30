import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { Icon } from '@rneui/themed'
import React, { useMemo, useCallback } from 'react'
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '@/Navigators/Main'
import { RootStackParamList } from '@/Navigators/Application'
import { StackNavigationProp } from '@react-navigation/stack'
import { CloseIcon } from '@/Components/Icons'
import { useState } from 'react'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import {
  addList,
  addTodo,
  deleteTodo,
  toggleTodo,
  Todo,
  TodoList,
  updateTodoText,
  removeList,
} from '@/Store/TodoList'
import { useSelector } from 'react-redux'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { TodoItem } from '@/Components'
import { RootState } from '@/Store'
import TodoItemsFlatList from '@/Components/TodoItemsFlatList'

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  StackNavigationProp<RootStackParamList, 'TodoListModal'>
>

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'TodoListModal'>

export default function TodoListModal() {
  const {
    params: { todoListId },
  } = useRoute<ModalScreenRouteProp>()
  const navigation = useNavigation<ModalScreenNavigationProp>()
  const dispatch = useDispatch()
  const { Common, Colors, Fonts, Layout, Gutters } = useTheme()
  const todoList = useSelector((state: RootState) => {
    return state.todoLists.todoLists.find(
      (todoList: TodoList) => todoList.id === todoListId,
    )
  })
  const [todoText, setTodoText] = useState<string>('')

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        todoListId: todoListId,
        todo: {
          id: uuidv4(),
          text: todoText,
          completed: false,
        } as Todo,
      }),
    )

    setTodoText('')
  }

  const handleTodoListDelete = () => {
    dispatch(removeList({ todoListId }))
    navigation.goBack()
  }

  const totalCompletedTodos = useMemo(() => {
    return todoList?.todos.reduce((prev, current) => {
      return prev + (current.completed ? 1 : 0)
    }, 0)
  }, [todoList?.todos])

  return (
    <View
      style={[
        Layout.fullSize,
        Layout.column,
        Gutters.regularHPadding,
        Gutters.regularVPadding,
        Common.backgroundWhite,
      ]}
    >
      {/* Header */}
      <View style={[Layout.rowCenter, Layout.justifyContentBetween]}>
        <TouchableOpacity onPress={handleTodoListDelete}>
          <Icon name="trash" type="evilicon" color={Colors.error} size={40} />
        </TouchableOpacity>
        {todoList?.todos.length ? (
          <Text style={[Fonts.textSmall]}>
            {totalCompletedTodos}/{todoList?.todos.length} Completed
          </Text>
        ) : null}
        <TouchableOpacity onPress={navigation.goBack}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* List's name */}
      <Text style={[Gutters.largeTMargin, Fonts.textCenter, Fonts.textRegular]}>
        {todoList?.name}
      </Text>

      <View style={[Gutters.smallTMargin, Layout.fullWidth, Layout.row]}>
        <View style={[Common.divider.regular]} />
      </View>

      {/* Todo items list*/}
      {todoList?.todos && (
        <TodoItemsFlatList todoItems={todoList.todos} todoListId={todoListId} />
      )}

      {/* Add todo input */}
      <View
        style={[
          {
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 10,
          },
          Layout.rowCenter,
        ]}
      >
        <TextInput
          style={[
            Common.textInput,
            Fonts.textSmall,
            {
              flex: 1,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
            },
          ]}
          onChangeText={newText => setTodoText(newText)}
          value={todoText}
          placeholder="Add todo"
        />
        <TouchableOpacity
          style={[
            Common.button.base,
            Gutters.smallLMargin,
            { height: 52, borderRadius: 4 },
          ]}
          onPress={handleAddTodo}
          disabled={(!todoText && true) || false}
        >
          <Icon name="add" color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
