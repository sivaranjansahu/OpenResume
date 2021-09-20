import { createSlice } from "@reduxjs/toolkit";
import { IEducation } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface edState {
  active: boolean;
  list: IEducation[];
}

// Define the initial state using that type
const initialState: edState = {
  active: true,
  list: [],
};
export const educationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {
    setInitialEducation: (state, action) => {
      state.list = action.payload.list;
      state.active = action.payload.active;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addEducation: (state, action) => {
      state.list.push(action.payload);
    },
    removeEducation: (state, action) => {
      var index = state.list.findIndex((ed) => {
        return ed.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEducation, removeEducation, setActive, setInitialEducation } =
  educationSlice.actions;

export default educationSlice.reducer;
