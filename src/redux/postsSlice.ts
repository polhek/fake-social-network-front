import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axios from 'axios'


export const getAllPosts  = createAsyncThunk('all/posts', async(token: string, thunkAPI)=>{
    try {
        const response = await axios.get("https://warm-falls-67590.herokuapp.com/api/posts/all",{
            headers: { Authorization: token },
          })

        if (response.status === 200) {
            const posts = response.data.posts;
            return {...response.data,  posts: posts}
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (err) {
        console.log('Error', err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
})







interface PostsState {
    allPosts?:any[];
    isFetching: boolean;
    isSuccess:boolean;
    isError:boolean;
  }


  const initialState: PostsState = {
    allPosts:undefined,
    isFetching: false,
    isSuccess:false,
    isError:false,
  }

  export const allPostsSlice = createSlice({
    name: 'allPosts',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
            state.allPosts = payload.posts;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          })
        builder.addCase(getAllPosts.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
          })
        builder.addCase(getAllPosts.pending,(state) => {
            state.isFetching = true;
          })
    }
  })

  export default allPostsSlice.reducer