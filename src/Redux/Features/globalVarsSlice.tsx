import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true,
        userUpdater: true,
        canScroll: true,
        activeProfileMenu: 'orders'
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' }) => { return { ...state, activeProfileMenu: action.payload } },
        userUpdater: state => { return { ...state, userUpdater: !state.userUpdater } },
        changeCanScroll: (state, action) => { return { ...state, canScroll: action.payload } },
    },
})

export default globalVarsSlice.reducer
export const { isScrolledDownUpdater, changeProfileActiveMenu, userUpdater, changeCanScroll } = globalVarsSlice.actions