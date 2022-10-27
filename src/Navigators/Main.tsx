import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'
import ArchiveContainer from '@/Containers/ArchiveContainer'
import { ArchiveIcon, HistoryIcon, HomeIcon } from '@/Components/Icons'
import { DefaultVariables } from '@/Theme'
import { Route } from '@react-navigation/native'
import { Icon } from '@rneui/themed'

export type TabStackParamList = {
  Home: undefined
  Archive: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: DefaultVariables.Colors.secondary,
        tabBarInactiveTintColor: DefaultVariables.Colors.text,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />
          }
          if (route.name === 'Archive') {
            return <Icon name="archive" color={color} size={size} />
          }

          return null
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="Archive" component={ArchiveContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
