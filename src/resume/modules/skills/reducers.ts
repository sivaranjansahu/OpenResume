import { createSlice } from "@reduxjs/toolkit";
import { ISkill } from "../../interfaces/forminterfaces";

// Define a type for the slice state
interface SkillsState {
  active: boolean;
  list: ISkill[];
}

// Define the initial state using that type
const initialState: SkillsState = {
  active: true,
  list: [],
};
export const skillsSlice = createSlice({
  name: "skills",
  initialState: initialState,
  reducers: {
    setInitialSkills: (state, action) => {
      state.list = action.payload.list;
      state.active = action.payload.active;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    addSkill: (state, action) => {
      state.list.push(action.payload);
    },
    setAllSkills: (state, action) => {
      state.list=action.payload;
    },
    removeSkill: (state, action) => {
      var index = state.list.findIndex((skill) => {
        return skill.id === action.payload;
      });
      state.list.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSkill, removeSkill, setActive, setInitialSkills,setAllSkills } =
  skillsSlice.actions;

export default skillsSlice.reducer;
