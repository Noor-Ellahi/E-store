import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart = createAsyncThunk('carts/cartSlice', async (thunkAPI) => {
    // const res = await axios.get('/api/cart')
    // const items = res.data?.cart?.items || [];
    // return items
    try {
        const res = await axios.get('/api/cart', {
            headers: {
                Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTA0ODk3MmQ0ZjZhMjE0MzI5MTFiNiIsImVtYWlsIjoiZmFyb29xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjM2OTUzOCwiZXhwIjoxNzYyMzczMTM4fQ.0-15cITwdbWwU2aFkN5ocnzHF-bJNBPMl9ysBygPeGM'}`
            }
        });
        return res.data?.cart?.items || [];
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
});

export const addToCartAsync = createAsyncThunk('carts/addToCart', async (product, rejectWithValue) => {
    try {
        const res = await axios.post('/api/cart',
            { productId: product._id, quantity: product.quantity },
            {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTA0ODk3MmQ0ZjZhMjE0MzI5MTFiNiIsImVtYWlsIjoiZmFyb29xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjM2OTUzOCwiZXhwIjoxNzYyMzczMTM4fQ.0-15cITwdbWwU2aFkN5ocnzHF-bJNBPMl9ysBygPeGM'
                }
            }
        )
        return res.data?.cart?.items || []
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }


})




const cartSlice = createSlice({
    name: "carts",
    initialState: {
        items: [],
        statusbar: 'idle',
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(i => i._id !== action.payload);
        },
        clearCart: state => {
            state.items = [];
        },
    },
    extraReducers: builder => {
        builder
            // fetch Cart
            .addCase(fetchCart.pending, state => {
                state.statusbar = "loading";
            })

            .addCase(fetchCart.fulfilled, (state, action) => {
                state.statusbar = "succeeded";
                state.items = action.payload
            })
            .addCase(fetchCart.rejected, state => {
                state.statusbar = "failed";
            })

            // addtocart
            .addCase(addToCartAsync.pending, state => {
                state.statusbar = "loading"
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.statusbar = "succeeded";
                state.items = action.payload
            })
            .addCase(addToCartAsync.rejected, state => {
                state.statusbar = "failed";
            })

    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

