import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import authMiddleware from '../shared/utils/authMiddleware'

const store = configureStore({
    reducer: { auth: authSlice.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)    
})

export default store

