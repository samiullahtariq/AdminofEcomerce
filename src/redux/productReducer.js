import { createSlice } from "@reduxjs/toolkit";


//we have createSlice and we are creation productSice
export const productSlice = createSlice({
    
  name: "product",
  //initial state of product
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    //if there is success in getting product
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    //if there occured an error while fetching
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    //if admin want to delete the produt
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    //if there is success while deleting the product
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      //deleting product by the id
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    // if there occured an error then this reducer will be called
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    /// if you want to update
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // if updating is successful
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      /// we are updating our product here
      //we are finding the index by the state.products.findIndex method
      // note these method only work in @reduxjstoolkit if you are using simple redux this will not wort in the reduers
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    //if there occured an errror while updating
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;