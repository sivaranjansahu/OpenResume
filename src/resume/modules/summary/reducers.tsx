import { createSlice } from "@reduxjs/toolkit";
import { ISummary } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface SummaryState {
  active: boolean;
  content: string;
  altName?:string;
}

// Define the initial state using that type
const initialState: SummaryState = {
  active: true,
  content:""
  // info: {
  //   summary: "",
  // },
};
export const summarySlice = createSlice({
  name: "summary",
  initialState: initialState,
  reducers: {
    setSummary: (state, action) => {
      state.content = action.payload.content;
      state.active = action.payload.active;
      state.altName= action.payload.altName;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSummary, setActive } = summarySlice.actions;

export default summarySlice.reducer;
