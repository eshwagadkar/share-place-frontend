import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isLoggedIn: false,
        userId: null, 
        token: null  
    },
    reducers: {
        login(state, action){
            state.token = action.payload?.token || null
            state.userId = action.payload?.userId ?? null

             // set isLoggedIn TRUE only if token exists
            state.isLoggedIn = !!state.token
        },
        logout(state, action){
            state.token = null
            state.userId = null
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions 

export default authSlice