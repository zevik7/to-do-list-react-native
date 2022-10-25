/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
      fontFamily: 'NanumGothic-Regular',
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
      fontFamily: 'NanumGothic-Regular',
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
      fontFamily: 'NanumGothic-Regular',
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      color: Colors.text,
      fontFamily: 'NanumGothic-Bold',
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      color: Colors.text,
      fontFamily: 'NanumGothic-Bold',
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      color: Colors.text,
      fontFamily: 'NanumGothic-Bold',
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
