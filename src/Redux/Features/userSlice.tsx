import { userDataTypes, userRelatedDataTypes } from "@/global.t";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: { data: {}, relatedData: {}, isLogin: false } as { data: userDataTypes, relatedData: userRelatedDataTypes, isLogin: boolean },
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