import { StyleSheet } from 'react-native'
import { CommonParams } from '@/Theme/theme'

export default function <C>({ Colors, Gutters }: CommonParams<C>) {
  return StyleSheet.create({
    regular: {
      backgroundColor: Colors.primary,
      height: 1,
      flex: 1,
      alignSelf: 'center',
      opacity: 0.3,
      ...Gutters.smallVMargin,
    },
  })
}
