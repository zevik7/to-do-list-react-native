import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'lang',
  initialState: {
    currentLang: 'en'
  } as LangState,
  reducers: {
    changeLang: (
      state: LangState,
      { payload: { newLang } }: { payload: { newLang: string } },
    ) => {
      state.currentLang = newLang
    },
  },
})

export const {
  changeLang
} = slice.actions

export default slice.reducer

export type LangState = {
  currentLang: string
}
