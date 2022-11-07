import React from 'react'
import { SafeAreaView, StatusBar  } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import TodoListModal from '@/Containers/TodoListModal'
import { useSelector } from 'react-redux'
import { setI18nConfig } from '@/Translations'
import { RootState } from '@/Store'

const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Main: undefined
  Startup: undefined
  TodoListModal: { todoListId: string }
}

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const lang = useSelector((state: RootState) => state.lang.currentLang)

  setI18nConfig(lang)

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]} >
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen name="TodoListModal" component={TodoListModal} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
