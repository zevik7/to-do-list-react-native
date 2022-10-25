import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'
import ListContainer from '@/Containers/ListContainer'
import { HistoryIcon, HomeIcon } from '@/Components/Icons'
import { DefaultVariables } from '@/Theme'
import { Route } from '@react-navigation/native'

export type TabStackParamList = {
  Home: undefined;
	List: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route } : any) => ({
        headerShown: false,
        tabBarActiveTintColor: DefaultVariables.Colors.secondary,
        tabBarInactiveTintColor: DefaultVariables.Colors.text,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size}/>
          }
          if (route.name === 'List') {
            return <HistoryIcon color={color} size={size}/>
          }

          return null
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="List" component={ListContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
