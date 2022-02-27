import { publicRequest , userRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userReducer"
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
  } from "./productReducer";

//we will  call this login function in the login page in the pages folder

export const login = async(dispatch , user)=>{
    //we are dispation loginsTart which is comming from userReducer
    dispatch(loginStart())
    try{
            // full backend route is  http://localhost:5000/api/auth/login
        const response = await publicRequest.post("/auth/login" , user)
        
        dispatch(loginSuccess(response.data))

    }catch(err){
        //if there is error we will dispatch login failure
        dispatch(loginFailure())
    }
}

//function for getProducts

export const getProducts = async (dispatch) => {
    //we are dispatching the getProductStart  which we created in productReducer
    dispatch(getProductStart());
    try {
        // full route to get products is http://localhost:5000/api/products
      const respons = await publicRequest.get("/products");
      //if res is successful we will pass data to our Action.payload through getProductSuccess
      dispatch(getProductSuccess(respons.data));
    } catch (err) {
        // if there is error we will call getProductFailure
      dispatch(getProductFailure());
    }
  };


  //making function to delete Product

   // to delete the product first we need id  which we will be getting through where we will dispatch the fuction
export const deleteProduct = async (id, dispatch) => {
      // first calling deleteProductStart to start the process
    dispatch(deleteProductStart());
    try {
         // full route to get products is http://localhost:5000/api/products/:id
       const respon = await userRequest.delete(`/products/${id}`);
       // we will be just passing the id to deleteProductSuccess becouse we defiend the delete process 
       // productReducers (deleteProductSuccess)
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  
  export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

  export const addProduct = async (product, dispatch) => {
      /// we will be getting product from where we will be dispatching the function
    dispatch(addProductStart());
    try {
        // full route to post product is http://localhost:5000/api/products/
      const resp = await userRequest.post(`/products`, product);
       // sending data to addProductSuccess in productReducer
      dispatch(addProductSuccess(resp.data));

    } catch (err) {
      dispatch(addProductFailure());
    }
  };