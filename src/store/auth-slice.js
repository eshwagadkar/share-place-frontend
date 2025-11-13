import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isLoggedIn: false,
        userId: null    
    },
    reducers: {
        login(state, action){
            state.isLoggedIn = action.payload?.isLoggedIn ?? true
            state.userId = action.payload?.userId ?? null
        },
        logout(state, action){
            state.isLoggedIn = action.payload?.isLoggedIn ?? false
            state.userId = action.payload?.userId ?? null
        }
    }
})

export const authActions = authSlice.actions 

export default authSlice