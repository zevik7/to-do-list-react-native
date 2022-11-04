import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import i18n from 'i18n-js'
import { setI18nConfig } from '@/Translations'
import { useDispatch } from 'react-redux'
import { changeLang } from '@/Store/Lang'

export default function LangSelect() {
  const dispatch = useDispatch()
  const handleChangeLang = (value: string) => {
    dispatch(changeLang({ newLang: value }))
  }

  return (
    <RNPickerSelect
      onValueChange={handleChangeLang}
      items={[
        { label: 'English', value: 'en' },
        { label: 'Vietnamese', value: 'vi' },
      ]}
      placeholder={{}}
      value={i18n.locale}
    />
  )
}
