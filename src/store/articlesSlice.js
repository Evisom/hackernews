import { createSlice } from '@reduxjs/toolkit'

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articleID: []
    },
    reducers: {
      updateArticles: (state, action) => {
        state.articleID = action.payload.articleID;
      }
    },
  })
  
  
  export const { updateArticles } = articlesSlice.actions
  
  export default articlesSlice.reducer