import { createSlice } from "@reduxjs/toolkit";

// TODO: 中身を考える必要あり↓ おそらくsupabaseのgetUser関数の戻り値を突っ込めばいいのでは？
export interface UserState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
}

const initialState: UserState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;