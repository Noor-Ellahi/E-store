import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserFromCookie = createAsyncThunk(
    "auth/fetchUserFromCookie",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(
                '/api/profile'
            )
            return res.data.user
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.error || "Not logged in");
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, statusbar: "Idle", error: null },
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserFromCookie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserFromCookie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserFromCookie.rejected, (state, action) => {
                state.status = "failed";
                state.user = null;
                state.error = action.payload;
            });
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer