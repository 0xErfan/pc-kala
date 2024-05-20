import { createSlice } from "@reduxjs/toolkit";

const globalVarsSlice = createSlice({
    name: 'globalVars',
    initialState: {
        isScrolledDown: true,
        userRelatedDataUpdater: true,
        activeProfileMenu: 'account-details'
    },
    reducers: {
        isScrolledDownUpdater: (state, action) => { return { ...state, isScrolledDown: action.payload } },
        changeProfileActiveMenu: (state, action: { payload: 'account-details' | 'orders' | 'likes' | 'messages' }) => { return { ...state, activeProfileMenu: action.payload } },
        userRelatedDataUpdater: state => { return { ...state, userRelatedDataUpdater: !state.userRelatedDataUpdater } },
    },
})

export default globalVarsSlice.reducer
export const { isScrolledDownUpdater, changeProfileActiveMenu, userRelatedDataUpdater } = globalVarsSlice.actions