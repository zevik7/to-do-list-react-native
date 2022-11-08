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
import { addTodo, Todo } from '@/Store/TodoList'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import TodoItemsFlatList from '@/Components/TodoItemsFlatList'
import { translate } from '@/Translations'
import {
  useAddTodoMutation,
  useFetchTodoListQuery,
  useRemoveTodoListMutation,
  useUpdateTodoListMutation,
} from '@/Services/api'

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
  const [todoText, setTodoText] = useState<string>('')
  const { data, isLoading } = useFetchTodoListQuery({ id: todoListId })
  const [removeTodoList, removeResponse] = useRemoveTodoListMutation()
  const [updateTodoList, updateResponse] = useUpdateTodoListMutation()
  const [addTodo, addTodoResponse] = useAddTodoMutation()

  const handleAddTodo = () => {
    addTodo({
      todoListId,
      text: todoText
    })

    setTodoText('')
  }

  const handleTodoListDelete = async () => {
    await removeTodoList({ id: todoListId })
    navigation.goBack()
  }

  const handleTodoListArchive = async () => {
    await updateTodoList({
      id: todoListId,
      data: {
        status: data?.status === 'active' ? 'archive' : 'active',
      },
    })
    navigation.goBack()
  }

  const totalCompletedTodos = useMemo(() => {
    if(!data) return
    return data?.todos?.reduce((prev: number, current: Todo) => {
      return prev + (current.completed ? 1 : 0)
    }, 0)
  }, [data])

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
        {data?.todos?.length ? (
          <Text style={[Fonts.textSmall]}>
            {totalCompletedTodos}/{data.todos.length}{' '}
            {translate('status.completed', '')}
          </Text>
        ) : null}
        <TouchableOpacity onPress={navigation.goBack}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* List's name */}
      <View
        style={[
          Gutters.largeTMargin,
          Layout.rowCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <Text style={[Fonts.textCenter, Fonts.textRegular]}>{data?.name}</Text>
        <TouchableOpacity onPress={handleTodoListArchive}>
          <Icon
            name={data?.status === 'active' ? 'archive' : 'unarchive'}
            color={Colors.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View style={[Gutters.smallTMargin, Layout.fullWidth, Layout.row]}>
        <View style={[Common.divider.regular]} />
      </View>

      {/* Todo items list*/}
      {data?.todos && (
        <TodoItemsFlatList todoItems={data.todos} todoListId={todoListId} />
      )}

      {/* Add todo input */}
      <View style={[Layout.rowCenter]}>
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
          placeholder={translate('add_todo_placeholder', '')}
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
