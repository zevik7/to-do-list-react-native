import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import { CheckBox } from '@rneui/themed'
import { Icon } from '@rneui/themed'
import { useRemoveTodoMutation } from '@/Services/api'

type Props = {
  id: string
  completed: boolean
  text: string
  todoListId: string
}

export default function TodoItem(props: Props) {
  const { id, completed, text, todoListId } = props
  const { Layout, Colors, Fonts, Common, Gutters } = useTheme()
  const [currentText, setCurrentText] = useState<string>(text)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [removeTodo, removeTodoResponse] = useRemoveTodoMutation()

  const handleToggle = () => {
   
  }

  const handleDelete = () => {
    removeTodo({
      todoListId,
      todoId: id,
    })
  }

  const handleUpdate = () => {
    // dispatch(updateTodoText({ todoListId, todoId: id, newText: currentText }))
    setEditMode(false)
  }

  return (
    <View
      style={[
        Layout.rowHCenter,
        Layout.justifyContentBetween,
        
        {
          borderWidth: 1,
          borderColor: 'rgb(225,225,225)',
          borderRadius: 10,
          backgroundColor: Colors.white
        },
      ]}
    >
      <View style={[Layout.rowHCenter, Layout.fill]}>
        <TouchableOpacity
          onPress={handleDelete}
          style={[Gutters.smallHPadding, Gutters.smallVPadding]}
          disabled={editMode}
        >
          <Icon
            name="md-remove-circle-outline"
            type="ionicon"
            size={28}
            color={editMode ? Colors.disabled : Colors.error}
          />
        </TouchableOpacity>
        <View
          style={[
            Layout.fill,
            Layout.rowCenter,
            {
              position: 'relative',
            },
          ]}
        >
          <TextInput
            style={[
              Layout.fill,
              Common.textInput,
              Fonts.textSmall,
              Fonts.textLeft,
              {
                color: completed ? 'rgba(0,0,0,0.2)' : Colors.text,
                borderWidth: editMode ? 1 : 0,
                height: 35,
              },
            ]}
            onChangeText={newCurrentText => setCurrentText(newCurrentText)}
            value={currentText}
            onFocus={() => setEditMode(true)}
            onEndEditing={handleUpdate}
          />
          {completed && !editMode && (
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                right: 10,
                height: 2,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            />
          )}
        </View>
      </View>
      {!editMode ? (
        <CheckBox
          center
          checked={completed}
          onPress={handleToggle}
          style={{
            alignSelf: 'center',
            margin: 0,
          }}
          checkedColor={Colors.success}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <Pressable
          onPress={handleUpdate}
          style={{
            padding: 10,
            marginHorizontal: 5,
          }}
        >
          <Icon name="check" type="antdesign" />
        </Pressable>
      )}
      <Icon name="drag-vertical" type="material-community" />
    </View>
  )
}
