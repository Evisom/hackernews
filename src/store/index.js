import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './articlesSlice'

export default configureStore({
  reducer: {
    articles: articleReducer
  },
})