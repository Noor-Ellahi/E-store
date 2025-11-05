
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk('products/fetchProducts' , async ()=>{
    const res = await axios.get('/api/products/all-products/')
    return res.data.getItems
})


const productsSlice = createSlice({
    name : "products",
    initialState : {
        items : [],
        statusbar : 'idle',
    },
    reducers : {},
    extraReducers : builder => {
        builder
            .addCase(fetchProducts.pending , state => {
                state.statusbar = "loading";
            })

            .addCase(fetchProducts.fulfilled , (state , action) =>{
                state.statusbar = "succeeded";
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected , state => {
                state.statusbar = "failed";
            })

    }
})


export default productsSlice.reducer