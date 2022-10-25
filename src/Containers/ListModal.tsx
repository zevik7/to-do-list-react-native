import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native'
import { Icon } from '@rneui/themed'
import { CheckBox } from '@rneui/themed'
import React from 'react'
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

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  StackNavigationProp<RootStackParamList, 'ListModal'>
>

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'ListModal'>

export default function ListModal() {
  const navigation = useNavigation<ModalScreenNavigationProp>()
  const {
    params: { listId },
  } = useRoute<ModalScreenRouteProp>()
  const { Common, Colors, Fonts, Layout, Gutters } = useTheme()
  const [listName, setListName] = useState<string>('')

  return (
    <View style={[Common.backgroundWhite, Layout.column, Layout.fullHeight]}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          top: 20,
          zIndex: 10,
        }}
        onPress={navigation.goBack}
      >
        <CloseIcon />
      </TouchableOpacity>

			{/* Todo items */}
      <View>
        <TextInput
          style={[Common.textInput, Fonts.textRegular, Fonts.textLeft]}
          onChangeText={newListName => setListName(newListName)}
          value={listName}
          placeholder="Enter list name"
        />
        <View style={[Common.divider.regular]} />

        <ScrollView>
          <View style={[Layout.rowHCenter]}>
            <CheckBox
              center
              checked={true}
              onPress={() => {}}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text style={[Fonts.textSmall]}>Do you like React Native?</Text>
          </View>
          <View style={[Layout.rowHCenter]}>
            <CheckBox
              center
              checked={true}
              onPress={() => {}}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text style={[Fonts.textSmall]}>Do you like React Native?</Text>
          </View>
          <View style={[Layout.rowHCenter]}>
            <CheckBox
              center
              checked={true}
              onPress={() => {}}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text style={[Fonts.textSmall]}>Do you like React Native?</Text>
          </View>
          <View style={[Layout.rowHCenter]}>
            <CheckBox
              center
              checked={true}
              onPress={() => {}}
              style={{
                alignSelf: 'center',
              }}
              checkedColor={Colors.primary}
            />
            <Text style={[Fonts.textSmall]}>Do you like React Native?</Text>
          </View>
        </ScrollView>
      </View>
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
          onChangeText={newListName => setListName(newListName)}
          value={listName}
          placeholder="Add task"
        />
        <Pressable
          style={[
            Common.button.base,
            Gutters.smallLMargin,
            { height: 52, borderRadius: 4 },
          ]}
          onPress={() => navigation.navigate('ListModal', { listId: '1' })}
        >
          <Icon name="add" color={Colors.white} />
        </Pressable>
      </View>
    </View>
  )
}
