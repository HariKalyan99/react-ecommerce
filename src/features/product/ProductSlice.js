import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductsByFilter,
  fetchProductsById,
} from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProduct: null,
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

export const fetchAllBrandsAsync = createAsyncThunk(
  "brands/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
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

export const fetchAllCategoriesAsync = createAsyncThunk(
  "Cateory/fetchAllCategory",
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  "products/fetchAllProductId",
  async (id) => {
    const response = await fetchProductsById(id);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
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
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductsByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

// export const { increment } = productSlice.actions;

export const selectProduct = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectSelectedProduct = (state) => state.product.selectedProduct;

export default productSlice.reducer;
