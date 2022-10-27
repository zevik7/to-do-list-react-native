import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native'
import { Icon } from '@rneui/themed'
import React, { useEffect, useRef } from 'react'
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
} from '@/Store/TodoList'
import { useSelector } from 'react-redux'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { TodoItem } from '@/Components'
import { RootState } from '@/Store'

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  StackNavigationProp<RootStackParamList, 'ListModal'>
>

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'ListModal'>

export default function ListModal() {
  const {
    params: { listId },
  } = useRoute<ModalScreenRouteProp>()
  const navigation = useNavigation<ModalScreenNavigationProp>()
  const dispatch = useDispatch()
  const { Common, Colors, Fonts, Layout, Gutters } = useTheme()
  const todoList = useSelector((state: RootState) => {
    return state.todoLists.todoLists.find(
      (todoList: TodoList) => todoList.id === listId,
    )
  })
  const [todoText, setTodoText] = useState<string>('')

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        todoListId: listId,
        todo: {
          id: uuidv4(),
          text: todoText,
          status: 'Pending',
        },
      }),
    )

    setTodoText('')
  }

  const handleTodoItemToggle = (id: string) => {
    dispatch(
      toggleTodo({
        todoListId: listId,
        todoId: id,
      }),
    )
  }

  const handleTodoItemDelete = (id: string) => {
    dispatch(
      deleteTodo({
        todoListId: listId,
        todoId: id,
      }),
    )
  }

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      key={item.id}
      checked={item.completed}
      text={item.text}
      onDelete={() => handleTodoItemDelete(item.id)}
      onChange={() => {}}
      onStatusToggle={() => handleTodoItemToggle(item.id)}
    />
  )

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
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="trash" type="evilicon" color={Colors.error} size={40} />
        </TouchableOpacity>
        <Text style={[Fonts.textSmall]}>1/4 Completed</Text>
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

      {/* Todo items */}
      <FlatList
        data={todoList?.todos}
        renderItem={renderTodoItem}
        style={[Layout.column, Gutters.regularVMargin]}
      />

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
