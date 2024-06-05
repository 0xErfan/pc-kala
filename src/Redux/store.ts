import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Features/userSlice"
import globalVarsSlice from "./Features/globalVarsSlice"

export const store = configureStore({
    reducer: { userSlice, globalVarsSlice },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch