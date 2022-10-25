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
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { TabStackParamList } from '@/Navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Application'

export type HomeContainerNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>

const HomeContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation<HomeContainerNavigationProps>()

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.fill, Layout.colCenter, Common.backgroundWhite]}
    >
      {/* Header section */}
      <View style={[[Layout.colCenter, Gutters.largeVMargin]]}>
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
      <View style={[Gutters.largeHPadding, Layout.rowCenter]}>
        <Pressable
          style={[Common.button.rounded]}
          onPress={() => navigation.navigate('ListModal', { listId: '1' })}
        >
          <Text style={[Fonts.textRegular, { color: Colors.white }]}>
            Add List
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default HomeContainer
