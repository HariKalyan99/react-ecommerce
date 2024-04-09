import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilter } from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "filterProducts/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response.data;
  }
);

// export const fetchProductsBySortAsync = createAsyncThunk(
//   "sortProducts/fetchProductsBySort",
//   async (sort) => {
//     const response = await fetchProductsBySort(sort);
//     return response.data;
//   }
// );

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
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

// export const { increment } = productSlice.actions;

export const selectProduct = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
