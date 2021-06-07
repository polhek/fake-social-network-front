import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import allUserReducer from './allUsersSlice'
import allPostsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUserReducer,
    allPosts: allPostsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
