import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArr = state.filter(user => user._id !== action.payload);
      return newArr;
    },
  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequest } = requestSlice.actions;
