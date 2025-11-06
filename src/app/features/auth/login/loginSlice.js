// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchUser = createAsyncThunk('auth/login/fetchUser', async (item,  {rejectWithValue}) => {

//     try {
//         const res = await axios.post(
//             '/api/auth/login',
//             { email: item.userEmail, password: item.userPassword }
//         )
//         return res.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data || error.message);
//     }
// })


// const loginSlice = createSlice({
//     name: "login",
//     initialState: {
//         user: null,
//         statusbar: 'idle',
//         error: null
//     },
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//         },
//     },
//     extraReducers: builder => {
//         builder
//             .addCase(fetchUser.pending, state => {
//                 state.statusbar = "loading";
//                 state.error = null;
//             })

//             .addCase(fetchUser.fulfilled, (state, action) => {
//                 state.statusbar = "succeeded";
//                 state.user = action.payload
//             })

//             .addCase(fetchUser.rejected, (state, action) => {
//                 state.statusbar = "failed";
//                 state.error = action.payload
//             })
//     }
// })

// export const { logout } = loginSlice.actions;
// export default loginSlice.reducer;