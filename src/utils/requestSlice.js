import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) =>  state.filter(state._id !== action.payload),
  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequest } = requestSlice.actions;
