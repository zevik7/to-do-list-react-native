import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/Hooks'
import { CheckBox } from '@rneui/themed'
import { Icon } from '@rneui/themed'
import { useDispatch } from 'react-redux'
import { updateTodoText } from '@/Store/TodoList'

type Props = {
  id: string
  completed: boolean
  text: string
  onDelete: () => void
  onChange: (newText : string) => void
  onStatusToggle: () => void
}

export default function TodoItem(props: Props) {
  const {
    id,
    completed,
    text,
    onDelete,
    onChange,
    onStatusToggle,
  } = props
  const { Layout, Colors, Fonts, Common, Gutters, Variables } = useTheme()
  const [currentText, setCurrentText] = useState<string>(text)
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleUpdateText = () => {
    onChange(currentText)
    setEditMode(false)
  }

  return (
    <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
      <View style={[Layout.rowHCenter, Layout.fill]}>
        <TouchableOpacity
          onPress={onDelete}
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
              Fonts.textRegular,
              Fonts.textLeft,
              {
                color: completed ? 'rgba(0,0,0,0.2)' : Colors.text,
                borderWidth: editMode ? 1 : 0,
              },
            ]}
            onChangeText={newCurrentText => setCurrentText(newCurrentText)}
            value={currentText}
            onFocus={() => setEditMode(true)}
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
          onPress={onStatusToggle}
          style={{
            alignSelf: 'center',
            margin: 0,
          }}
          checkedColor={Colors.success}
        />
      ) : (
        <Pressable
          onPress={handleUpdateText}
          style={{
            padding: 10,
            marginHorizontal: 5,
          }}
        >
          <Icon name="check" type="antdesign" />
        </Pressable>
      )}
    </View>
  )
}
