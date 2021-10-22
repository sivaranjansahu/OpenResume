import { createSlice } from "@reduxjs/toolkit";
import { ILink } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface LinksState {
  active: boolean;
  list: ILink[];
  altName?:string;
}

// Define the initial state using that type
const initialState: LinksState = {
  active: true,
  list: [],
};
export const linksSlice = createSlice({
  name: "links",
  initialState: initialState,
  reducers: {
    setInitialLinks: (state, action) => {
      state.list = action.payload ? action.payload.list: [];
      state.active = action.payload ?  action.payload.active: true;
      state.altName= action.payload.altName;
    },
    setAltName: (state, action) => {
      state.altName = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addLink: (state, action) => {
      state.list.push(action.payload);
    },
    deleteLink: (state, action) => {
      var index = state.list.findIndex((link) => {
        return link.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLink, deleteLink, setActive, setInitialLinks,setAltName } =
  linksSlice.actions;

export default linksSlice.reducer;
