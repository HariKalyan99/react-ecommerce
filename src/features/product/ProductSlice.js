import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

// export const { increment } = productSlice.actions;

export const selectProduct = (state) => state.product.products;

export default productSlice.reducer;
