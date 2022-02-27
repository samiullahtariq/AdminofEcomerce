import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name : "user",
    initialState :{
        currentUser : null,
        isFetching : false,
        error : false
    },
    reducers :{
        //our first reducer will be loginStart
        loginStart : (state)=>{
             
            state.isFetching = true
          
        },
        //our second reducer is loginSuccess
        loginSuccess :(state, action)=>{
            state.isFetching = false
            //if fetching is false we will set currentUser from dispatching
            state.currentUser = action.payload
        },
         //our third reducer is login
         loginFailure :(state)=>{

            state.isFetching = false

            // if there is login failure than error will be true

            state.error= true
        
        }
    }

})

// exporting reducers from userSlice.action
export const {loginStart , loginSuccess , loginFailure} = userSlice.actions

// exporting reducer from userSlice
export default userSlice.reducer