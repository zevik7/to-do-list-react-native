import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { TabStackParamList } from '@/Navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Application'

export type TodoListItemNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList, 'ListModal'>
>

type Props = {
  listId: string
  name: string
  totalcompletedTodos: number
  totalTodosLength: number
}

const TodoListItem = ({
  listId,
  name,
  totalcompletedTodos,
  totalTodosLength,
}: Props) => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation<TodoListItemNavigationProps>()

  return (
    <Pressable
      onPress={() => navigation.navigate('ListModal', { listId: listId })}
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
            borderColor: Colors.secondary,
            borderRadius: 5
          }
        ]}
      >
        <Text style={[Fonts.textRegular]}>{name}</Text>
        <Text style={[Fonts.textSmall]}>{totalcompletedTodos}/{totalTodosLength} Completed</Text>
      </View>
    </Pressable>
  )
}

export default TodoListItem
