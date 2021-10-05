import { createSlice } from "@reduxjs/toolkit";
import { ISummary } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface SummaryState {
  active: boolean;
  info: ISummary;
}

// Define the initial state using that type
const initialState: SummaryState = {
  active: true,
  info: {
    summary: "",
  
  }
};
export const summarySlice = createSlice({
  name: "summary",
  initialState: initialState,
  reducers: {
    setSummary: (state, action) => {
      console.log("action", action);
      state.info = action.payload.info;
      state.active = action.payload.active;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSummary } = summarySlice.actions;

export default summarySlice.reducer;
