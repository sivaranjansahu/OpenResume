import { createSlice } from "@reduxjs/toolkit";
import { IWorkHistory } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface WorkExState {
  active: boolean;
  list: IWorkHistory[];
}

// Define the initial state using that type
const initialState: WorkExState = {
  active: true,
  list: [],
};
export const workHistorySlice = createSlice({
  name: "workhistory",
  initialState: initialState,
  reducers: {
    setInitialWorkHistory: (state, action) => {
      state.list = action.payload.list;
      state.active = action.payload.active;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addWorkHistory: (state, action) => {
      state.list.push(action.payload);
    },
    removeWorkHistory: (state, action) => {
      var index = state.list.findIndex((workhistory) => {
        return workhistory.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addWorkHistory,
  removeWorkHistory,
  setActive,
  setInitialWorkHistory,
} = workHistorySlice.actions;

export default workHistorySlice.reducer;
