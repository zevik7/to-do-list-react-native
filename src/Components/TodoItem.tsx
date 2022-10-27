import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/Hooks'
import { CheckBox } from '@rneui/themed'
import { Icon } from '@rneui/themed'

type Props = {
  checked: boolean
  text: string
  onDelete: () => void
  onChange: () => void
  onStatusToggle: () => void
}

export default function TodoItem(props: Props) {
  const { checked, text, onDelete, onChange, onStatusToggle } = props
  const { Layout, Colors, Fonts, Common, Gutters, Variables } = useTheme()

  return (
    <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
      <View style={[Layout.rowHCenter, Layout.fill]}>
        <TouchableOpacity
          onPress={onDelete}
          style={[Gutters.smallHPadding, Gutters.smallVPadding]}
        >
          <Icon
            name="remove-circle-outline"
            type="ionicon"
            size={28}
            color={Variables?.Colors?.error}
          />
        </TouchableOpacity>
        <TextInput
          style={[
            Common.textInput,
            Fonts.textRegular,
            {
              textDecorationLine: checked ? 'line-through' : 'none',
              flex: 1,
            },
          ]}
          onChangeText={onChange}
          value={text}
        />
      </View>
      <CheckBox
        center
        checked={checked}
        onPress={onStatusToggle}
        style={{
          alignSelf: 'center',
          margin: 0
        }}
        checkedColor={Colors.success}
      />
    </View>
  )
}
