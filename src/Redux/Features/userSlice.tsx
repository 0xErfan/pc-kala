import { showToast } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getMe = createAsyncThunk('getMe', async () => {
    const res = await fetch('/api/auth/me')
    const data = await res.json()

    if (!res.ok) showToast(false, 'something bad happened :))', res?.message)

    console.log(data)
    return data;
})

const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMe.fulfilled, (_state, action) => action.payload)
    }
})

export default userSlice.reducer;
export { getMe }