import { createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: {},
    expandedComments: []
  },
  reducers: {
    updateComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    addComment: (state, action) => {
      let kids = []
      for (const i in action.payload.kids) {
        kids.push(String(action.payload.kids[i]))
      }
      state.comments[String(action.payload.id)] = kids

    },
    expandComment: (state, action) => {
      if (state.expandedComments.indexOf(action.payload.id === -1)) {
        state.expandedComments.push(String(action.payload.id))
      }

    },
    closeComment: (state, action) => {
      state.expandedComments = state.expandedComments.filter(e => e !== action.payload.id)
    }
  },
})


export const { updateComments, addComment, expandComment, closeComment } = commentsSlice.actions

export default commentsSlice.reducer