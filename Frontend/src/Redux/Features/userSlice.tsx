import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userDataProps {
    name: string
    lName: string
    email: string
    phoneNumber: number
    melliCode: number,
    orders: unknown[]
    notifications: unknown[]
    isLogin: boolean
}

type userDataPropsAndNull = {
    [K in keyof userDataProps]: userDataProps[K] | null
}

const initialState: userDataPropsAndNull = {
    name: null,
    lName: null,
    email: null,
    melliCode: null,
    phoneNumber: null,
    orders: [],
    notifications: [],
    isLogin: false
}

const userDataUpdater = createAsyncThunk("userUpdater", () => { })

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(userDataUpdater.pending, (state, action) => {
            console.log(state, action);
        })
    }
})

export default userSlice.reducer;