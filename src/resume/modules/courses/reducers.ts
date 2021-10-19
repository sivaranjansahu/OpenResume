import { createSlice } from "@reduxjs/toolkit";
import { ICourse} from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface CoursesState {
  active: boolean;
  list: ICourse[];
  altName?:string;
}

// Define the initial state using that type
const initialState: CoursesState = {
  active: true,
  list: [],
};
export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    setInitialCourses: (state, action) => {
      state.list = action.payload ? action.payload.list: [];
      state.active = action.payload ?  action.payload.active: true;
      state.altName= action.payload.altName;
    },
    setAltName: (state, action) => {
      state.altName = action.payload;
    },
    setAllCourses: (state, action) => {
      state.list = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addCourse: (state, action) => {
      state.list.push(action.payload);
    },
    deleteCourse: (state, action) => {
      var index = state.list.findIndex((link) => {
        return link.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialCourses,addCourse, deleteCourse, setActive,setAllCourses,setAltName } =
coursesSlice.actions;

export default coursesSlice.reducer;
