/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import dividerStyles from './components/Divider'
import { CommonParams } from './theme'

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    divider: dividerStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundWhite: {
        backgroundColor: Colors.white,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderBottomWidth: 2,
        borderColor: Colors.secondary,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10
      },
    }),
  }
}
