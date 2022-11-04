import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'
import ArchiveContainer from '@/Containers/ArchiveContainer'
import { HomeIcon } from '@/Components/Icons'
import { DefaultVariables } from '@/Theme'
import { Icon } from '@rneui/themed'
import { translate } from '@/Translations'

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
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabel: translate('tab_bar.home', ''),
        }}
      />
      <Tab.Screen
        name="Archive"
        component={ArchiveContainer}
        options={{
          tabBarLabel: translate('tab_bar.archive', ''),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
