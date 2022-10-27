import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
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
import { addList, TodoList } from '@/Store/TodoList'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import TodoListsFlatList from '@/Components/TodoListsFlatList'
import { CloseIcon } from '@/Components/Icons'

export type HomeContainerNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>

const HomeContainer = () => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [listName, setListName] = useState<string>('')
  const dispatch = useDispatch()

  const handleAddList = () => {
    if (!listName) return
    dispatch(
      addList({
        todoList: {
          id: uuidv4(),
          name: listName,
          todos: [],
        },
      }),
    )
    setListName('')
    setIsModalVisible(false)
  }

  return (
    <View
      style={[
        Layout.fullSize,
        Layout.colCenter,
        Gutters.tinyHPadding,
        Gutters.smallVPadding,
        Common.backgroundWhite,
      ]}
    >
      {/* Header section */}
      <View style={[[Gutters.largeVMargin, Layout.colCenter]]}>
        <View style={[Layout.rowCenter]}>
          <View style={[Common.divider.regular]} />
          <Text
            style={[
              Gutters.smallBMargin,
              Gutters.smallHMargin,
              Fonts.titleSmall,
            ]}
          >
            TODO LISTS
          </Text>
          <View style={[Common.divider.regular]} />
        </View>

        <Brand width={60} height={60} />
      </View>

      {/* Add list button */}
      <View
        style={[Gutters.largeBMargin, Gutters.largeHPadding, Layout.rowCenter]}
      >
        <Pressable
          style={[Common.button.rounded]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[Fonts.textRegular, { color: Colors.white }]}>
            Add List
          </Text>
        </Pressable>
      </View>

      {/* Todo List Item */}
      <TodoListsFlatList />

      {/* Modal List Name */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible)
        }}
      >
        <View
          style={[
            Layout.fill,
            Layout.colCenter,
            { backgroundColor: 'rgba(0,0,0,0.5)' },
          ]}
        >
          <View
            style={[
              Gutters.largeHPadding,
              Gutters.largeVPadding,
              styles.modalView,
            ]}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
                top: 20,
                zIndex: 10,
              }}
              onPress={() => setIsModalVisible(false)}
            >
              <CloseIcon />
            </TouchableOpacity>

            <Text style={[Fonts.textRegular]}>Create Todo List</Text>

            <View style={[Gutters.regularVMargin]}>
              <TextInput
                style={[
                  Gutters.largeVMargin,
                  Common.textInput,
                  Fonts.textSmall,
                  { width: 300 },
                ]}
                onChangeText={newListName => setListName(newListName)}
                value={listName}
                placeholder="Enter list name"
              />
            </View>

            <Pressable
              style={[Common.button.rounded, { width: 300 }]}
              onPress={handleAddList}
            >
              <Text
                style={[
                  Fonts.textCenter,
                  Fonts.textSmall,
                  { color: Colors.white },
                ]}
              >
                Create
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default HomeContainer
