import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './articlesSlice'
import commentsReducer from './commentsSlice'

export default configureStore({
  reducer: {
    articles: articleReducer,
    comments: commentsReducer
  },
})