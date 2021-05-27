import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axios from 'axios'


export const loginUser  = createAsyncThunk('user/login', async(access_token: string, thunkAPI)=>{
    try {
        const response = await axios.post("https://warm-falls-67590.herokuapp.com/api/user/oauth/facebook",{access_token})
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            return {...response.data, loggedIn:true, user: response.data.user}
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (err) {
        console.log('Error', err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
})


interface UserState {
    loggedIn:boolean,
    user: object,
    isFetching: boolean,
    isSuccess:boolean,
    isError:boolean
  }


  const initialState: UserState = {
    loggedIn: false,
    user: {},
    isFetching: false,
    isSuccess:false,
    isError:false,
  }

  export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        logOut: (state) =>{
            localStorage.clear();
            state = initialState;
            return state;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.loggedIn = payload.loggedIn;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
          })
        builder.addCase(loginUser.pending,(state) => {
            state.isFetching = true;
          })
    }
  })



  export const { logOut } = userSlice.actions


  export default userSlice.reducer