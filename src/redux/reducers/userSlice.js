import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    token: "",
  },
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserData, setToken, setEmail } = userSlice.actions;

export default userSlice.reducer;
