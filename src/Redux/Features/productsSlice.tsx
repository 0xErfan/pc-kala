import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface productsProps {
    allProducts: unknown[]
    categories: unknown[]
}

const initialState: productsProps = {
    allProducts: [],
    categories: [],
}

const getAllProducts = createAsyncThunk(
    "getAllProducts",
    async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products/all/");
            if (!response.ok) { throw new Error("Failed to fetch data"); }
            return await response.json();
        } catch (error) { throw new Error(error as string) }
    }
)

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => { state.allProducts = action.payload })
        builder.addCase(getAllProducts.rejected, (_state, action) => { console.log(action.error) })
    }
});

export default productsSlice.reducer;
export { getAllProducts };