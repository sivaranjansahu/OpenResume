import { createSlice } from "@reduxjs/toolkit";
import { IBasicInfo } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface BasicInfoState {
  active: boolean;
  info: IBasicInfo;
}

// Define the initial state using that type
const initialState: BasicInfoState = {
  active: true,
  info: {
    fullName: "",
    email: "",
    about: "",
    address: "",
    linkedIn: "",
    phoneno: "",
    website: "",
  },
};
export const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState: initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      console.log("action", action);
      state.info = action.payload.info;
      state.active = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBasicInfo } = basicInfoSlice.actions;

export default basicInfoSlice.reducer;