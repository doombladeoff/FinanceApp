import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        loginUser(state, action) {
            state.isAuthenticated = true;
        },
        logoutUser(state, action) {
            state.isAuthenticated = false;
        },
    },
});

export const authActions = { ...authSlice.actions };

export default authSlice;