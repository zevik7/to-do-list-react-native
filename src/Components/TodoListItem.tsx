import React, { useMemo } from 'react'
import { View, Text, Pressable, LayoutAnimation } from 'react-native'
import { useTheme } from '@/Hooks'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { TabStackParamList } from '@/Navigators/Main'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/Navigators/Application'
import { changeListStatus, Todo } from '@/Store/TodoList'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { useDispatch } from 'react-redux'

export type TodoListItemNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList, 'TodoListModal'>
>

type Props = {
  id: string
  name: string
  todos: Todo[]
}

const maxPan = 80

const TodoListItem = ({ id, name, todos }: Props) => {
  const { Fonts, Gutters, Layout, Colors } = useTheme()
  const navigation = useNavigation<TodoListItemNavigationProps>()
  const dispatch = useDispatch()
  const route = useRoute()

  const totalCompletedTodos = useMemo(() => {
    return todos.reduce((prev, current) => {
      return prev + (current.completed ? 1 : 0)
    }, 0)
  }, [todos])

  const offset = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      dispatch(
        changeListStatus({
          todoListId: id,
          status: route.name === 'Archive' ? 'active' : 'archive',
        }),
      )
    }, 250)
  }, [])

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { shouldRemove: boolean }
  >(
    {
      onActive: (event, ctx) => {
        const xVal = Math.floor(event.translationX)
        offset.value = xVal

        // use Absolute value so the user could swipe either left or right
        if (Math.abs(xVal) <= maxPan) {
          ctx.shouldRemove = false
        } else {
          ctx.shouldRemove = true
        }
      },
      onEnd: (_, ctx) => {
        if (ctx.shouldRemove) {
          // if the item should be removed, animate it off the screen first
          offset.value = withTiming(Math.sign(offset.value) * 2000)

          // then trigger the remove mood item with a small delay
          runOnJS(removeWithDelay)()
        } else {
          // otherwise, animate the item back to the start
          offset.value = withTiming(0)
        }
      },
    },
    [],
  )

  return (
    <Pressable
      onPress={() => navigation.navigate('TodoListModal', { todoListId: id })}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Reanimated.View
          style={[
            Gutters.regularVPadding,
            Gutters.regularHPadding,
            Gutters.regularBMargin,
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            animatedStyle,
            {
              borderWidth: 1,
              borderColor: 'rgb(220,220,220)',
              borderRadius: 10,
            },
          ]}
        >
          <Text style={[Fonts.textRegular]}>{name}</Text>
          {todos.length ? (
            <Text style={[Fonts.textSmall]}>
              {totalCompletedTodos}/{todos.length} Completed
            </Text>
          ) : null}
        </Reanimated.View>
      </PanGestureHandler>
    </Pressable>
  )
}

export default TodoListItem
