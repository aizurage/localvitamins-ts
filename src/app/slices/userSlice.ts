import { createSlice } from "@reduxjs/toolkit";

// TODO: 中身を考える必要あり↓ おそらくsupabaseのgetUser関数の戻り値を突っ込めばいいのでは？
export interface UserState {
    email: string
    username: string
}

const initialState: UserState = {
    email: "",
    username: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: () => {

        },
        logout: () => {

        }
    }
})

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;