import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true,
        userUpdater: true,
        activeProfileMenu: 'account-details'
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' }) => { return { ...state, activeProfileMenu: action.payload } },
        userUpdater: state => { return { ...state, userUpdater: !state.userUpdater } },
    },
})

export default globalVarsSlice.reducer
export const { isScrolledDownUpdater, changeProfileActiveMenu, userUpdater } = globalVarsSlice.actions