import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getMe = createAsyncThunk('getMe', async () => {
    const res = await fetch('/api/auth/me')
    const data = await res.json()

    if (!res.ok) throw new Error('Not loggedIN')

    return data;
})

const userSlice = createSlice({
    name: "userSlice",
    initialState: { data: null, isLogin: false },
    reducers: { userUpdater: (state, action) => ({ ...state, data: action.payload, isLogin: true }) },
    extraReducers: builder => {
        builder.addCase(getMe.fulfilled, (state, action) => { state.data = action.payload, state.isLogin = true })
        builder.addCase(getMe.rejected, (state) => { state.data = null, state.isLogin = false })
    }
})


export default userSlice.reducer;
export { getMe }
export const { userUpdater } = userSlice.actions