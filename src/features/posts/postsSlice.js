import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  { id: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
    content: 'Hello!'
  },
  { id: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post',
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
    content: 'More text'
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer(state, action){
        action.payload.reactions =  {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId
          }
        }
      }
    },
    postUpdated(state, action){
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)

      if (existingPost){
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action){
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)

      if (existingPost){
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
