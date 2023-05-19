import { createSlice } from '@reduxjs/toolkit'

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {
            // 1: false,
            // 2: {
            //     3: {
            //         4: false,
            //         5: false 
            //     },
            //     6: false,
            // },
            // 7: false 
        }
    },
    reducers: {
      updateComments: (state, action) => {
        state.comments = action.payload.comments;
      },
      addComment: (state, action) => {
        state.comments[action.payload.id] = false
      }
    },
  })
  
  
  export const { updateComments, addComment } = commentsSlice.actions
  
  export default commentsSlice.reducer