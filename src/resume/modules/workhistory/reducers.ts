import { createSlice } from "@reduxjs/toolkit";
import { IWorkHistory } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface WorkExState {
  active: boolean;
  list: IWorkHistory[];
  altName?: string;
}

// Define the initial state using that type
const initialState: WorkExState = {
  active: true,
  list: [],
  altName: "",
};
export const workHistorySlice = createSlice({
  name: "workhistory",
  initialState: initialState,
  reducers: {
    setInitialWorkHistory: (state, action) => {
      if (action.payload) {
        state.list = action.payload.list;
        state.active = action.payload.active;
        state.altName = action.payload.altName;
      }
    },
    setAllWorkHistory: (state, action) => {
      state.list = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setAltName: (state, action) => {
      console.log("setting name to " + action.payload);
      state.altName = action.payload;
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
  setAllWorkHistory,
  setAltName,
} = workHistorySlice.actions;

export default workHistorySlice.reducer;
