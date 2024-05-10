import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Features/userSlice"
import productsSlice from "./Features/productsSlice"
import globalVarsSlice from "./Features/globalVarsSlice"

export const store = configureStore({
    reducer: { userSlice, productsSlice, globalVarsSlice }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch