import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: { data: null, relatedData: {}, isLogin: false },
    reducers: {
        userDataUpdater: (state, action) => ({
            ...state,
            data: action.payload.userData,
            isLogin: action.payload.isLogin,
            relatedData: action.payload.userRelatedData
        }),
    },
})


export default userSlice.reducer;
export const { userDataUpdater } = userSlice.actions