import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart = createAsyncThunk('carts/cartSlice', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/api/cart'); // <-- NO headers needed
        return res.data || [];
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
});


export const addToCartAsync = createAsyncThunk('carts/addToCart', async (product, thunkAPI) => {
    try {
        const res = await axios.post('/api/cart', { productId: product._id, quantity: product.quantity });
        return res.data?.cart?.items || [];
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
});




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
            state.items.cart = state.items.cart.filter(i => i._id !== action.payload);
           
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

