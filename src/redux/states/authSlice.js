import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

import {
  loginUser,
  updateUser,
  refreshToken,
  verifyRefreshTokenUser,
} from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    redirectTo: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    clearRedirect: (state) => {
      state.redirectTo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      //Update User

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        alert('error al actulizar el usuario, logeate de nuevo')
        state.isLoading = false;
        state.error = action.payload?.error || "Error al actualizar el usuario";
        state.accessToken = null;
        state.redirectTo = "/auth";
      })

      //verifyRefreshTokenUser
      .addCase(verifyRefreshTokenUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyRefreshTokenUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(verifyRefreshTokenUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      });
  },
});

export const { clearRedirect } = authSlice.actions;
export default authSlice.reducer;
