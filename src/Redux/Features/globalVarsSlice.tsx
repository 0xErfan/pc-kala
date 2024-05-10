import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } }
    },
})

export default globalVarsSlice.reducer
export const { isScrolledDownUpdater } = globalVarsSlice.actions