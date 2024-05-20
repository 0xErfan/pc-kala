import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true,
        wishUpdater: true,
        activeProfileMenu: 'account-details'
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' }) => { return { ...state, activeProfileMenu: action.payload } },
        wishUpdater: state => { return { ...state, wishUpdater: !state.wishUpdater } },
    },
})

export default globalVarsSlice.reducer
export const { isScrolledDownUpdater, changeProfileActiveMenu, wishUpdater } = globalVarsSlice.actions