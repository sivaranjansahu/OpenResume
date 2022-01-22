import { createSlice } from "@reduxjs/toolkit";
import { ICustomSection } from "../../interfaces/forminterfaces";

// Define a type for the slice state

interface CustomSectionState {
list:ICustomSection[]
}

// Define the initial state using that type
const initialState: CustomSectionState = {
  list:[]
};
export const customSectionSlice = createSlice({
  name: "custom_section",
  initialState: initialState,
  reducers: {
    setInitial: (state, action) => {
      if(action.payload){
        state.list = action.payload.list;
       
      }

    },
    addCustomSection:(state,action)=>{
      state.list = [...state.list, action.payload];
    },
    deleteCustomSection:(state,action)=>{
      state.list = state.list.filter(item=>item.guid!==action.payload.customSectionId)
    }
    // setActive: (state, action) => {
    //   state.active = action.payload;
    // },
    // setAltName: (state, action) => {
    //   state.altName = action.payload;
    // },

  },
});

// Action creators are generated for each case reducer function
export const { addCustomSection,setInitial,deleteCustomSection } = customSectionSlice.actions;

export default customSectionSlice.reducer;
