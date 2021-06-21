import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axios from 'axios'


export const getAllUsers  = createAsyncThunk('all/users', async(token: string, thunkAPI)=>{
    try {
        const response = await axios.get("https://warm-falls-67590.herokuapp.com/api/user/allUsers",{
            headers: { Authorization: token },
          })

        if (response.status === 200) {
            const allUsers = response.data.allUsers;
            return {...response.data,  allUsers: allUsers}
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (err) {
        console.log('Error', err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
})




interface UserState {
    allUsers?:any[];
    isFetching: boolean;
    isSuccess:boolean;
    isError:boolean;
  }


  const initialState: UserState = {
    allUsers:undefined,
    isFetching: false,
    isSuccess:false,
    isError:false,
  }

  export const allUsersSlice = createSlice({
    name: 'allUsers',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.allUsers = payload.allUsers;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          })
        builder.addCase(getAllUsers.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
          })
        builder.addCase(getAllUsers.pending,(state) => {
            state.isFetching = true;
          })
    }
  })

  export default allUsersSlice.reducer