import { createSlice } from "@reduxjs/toolkit";
import { ILink, IProject } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface ProjectsState {
  active: boolean;
  list: IProject[];
  altName?:string;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  active: true,
  list: [],
};
export const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    setInitialProjects: (state, action) => {
      state.list = action.payload ? action.payload.list: [];
      state.active = action.payload ?  action.payload.active: true;
      state.altName= action.payload ? action.payload.altName:"";
    },
    setAltName: (state, action) => {
      state.altName = action.payload;
    },
    setAllProjects: (state, action) => {
      state.list = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addProject: (state, action) => {
      state.list.push(action.payload);
    },
    deleteProject: (state, action) => {
      var index = state.list.findIndex((link) => {
        return link.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllProjects,addProject, deleteProject, setActive, setInitialProjects,setAltName } =
projectSlice.actions;

export default projectSlice.reducer;
