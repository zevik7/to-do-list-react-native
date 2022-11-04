import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import * as RNLocalize from 'react-native-localize'

const translationGetters: any = {
  // lazy requires
  en: () => require('./resources/en.json'),
  vi: () => require('./resources/vi.json'),
}

export const translate = memoize(
  (key: any, config: any) => i18n.t(key, config),
  (key: any, config: any) => (config ? key + JSON.stringify(config) : key),
)

export const setI18nConfig = (lang?: string) => {
  const fallback = { languageTag: 'en' }
  let { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback

  if (translate.cache.clear) translate.cache.clear()

  if (lang) languageTag = lang

  console.log(lang)

  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}
