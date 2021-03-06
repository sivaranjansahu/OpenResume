import { createSlice } from "@reduxjs/toolkit";
import { IBasicInfo } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface BasicInfoState {
  active: boolean;
  info: IBasicInfo;
  altName?:string;
}

// Define the initial state using that type
const initialState: BasicInfoState = {
  active: true,
  info: {
    fullName: "",
    email: "",
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
      state.info =action.payload ?  action.payload.info : {
        fullName: "",
        email: "",
        address: "",
        linkedIn: "",
        phoneno: "",
        website: "",
      }
      state.active = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBasicInfo } = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
