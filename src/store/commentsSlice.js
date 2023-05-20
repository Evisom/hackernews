import { createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    expandedComments: [],
    flag: false
  },
  reducers: {
    expandComment: (state, action) => {
      if (state.expandedComments.indexOf(action.payload.id === -1)) {
        state.expandedComments.push(action.payload.id)
      }
    },
    closeComment: (state, action) => {
      state.expandedComments = state.expandedComments.filter(e => e !== action.payload.id)
    },
  },
})


export const { expandComment, closeComment } = commentsSlice.actions

export default commentsSlice.reducer