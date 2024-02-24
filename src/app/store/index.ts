import { configureStore, } from '@reduxjs/toolkit'
import { imageFeedSlice, } from '../../entities/image-feed/model/imageFeedSlice'


export const store = configureStore({
  reducer: {
    imageFeed: imageFeedSlice.reducer,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
