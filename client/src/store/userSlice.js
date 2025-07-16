import { createSlice } from "@reduxjs/toolkit";

    const initialState={
        _id:"",
        name:"",
        email:"",
        avatar:"",
        mobile:"",
        verify_email:'',
        last_login_date:"",
        status:"", // status can be 'active', 'inactive', 'banned', etc
        address_details:[], // array of address objects
        shopping_cart:[], // array of product objects
        orderHistory: [],
        role: '', 

    }

    const userSlice=createSlice({
        name:'user',
        initialState,
        reducers:{
            setUserDetails:(state,action)=>{
                state._id=action.payload?._id
                state.name=action.payload?.name
                state.email=action.payload?.email
                state.avatar=action.payload?.avatar
                state.mobile=action.payload?.mobile
                state.verify_email=action.payload?.verify_email
                state.last_login_date=action.payload?.last_login_date
                state.status=action.payload?.status
                state.address_details=action.payload?.address_details
                state.shopping_cart=action.payload?.shopping_cart
                state.orderHistory=action.payload?.orderHistory
                state.role = action.payload?.role; // Add role to the state
            },
            updatedAvatar:(state,action)=>{
                state.avatar=action.payload
            },
            logout:(state,action) => {
                state._id = "";
                state.name = "";
                state.email = "";
                state.avatar = "";
                state.mobile = "";
                state.verify_email = '';
                state.last_login_date = "";
                state.status = ""; // Reset status
                state.address_details = []; // Reset address details
                state.shopping_cart = []; // Reset shopping cart
                state.orderHistory = []; // Reset order history
                state.role = ''; // Reset role
            }
        }
    })

   export const {setUserDetails,logout, updatedAvatar} =userSlice.actions
    export default userSlice.reducer