import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ResumeState {
  profileName: string;
  profileId: string;
  profileNotes: string;
  lastUpdated: string;
  // skills?:{
  //     active: boolean;
  //     list: ISkill[];
  // },
  // workHistory?:{
  //     active: boolean;
  //     list: IWorkHistory[];
  // }
}

// Define the initial state using that type
const initialState: ResumeState = {
  profileId: "",
  profileName: "",
  profileNotes: "",
  lastUpdated: new Date().toString(),
};

export const resumeSlice = createSlice({
  name: "meta",
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.profileName = action.payload;
    },
    setNotes: (state, action) => {
      state.profileNotes = action.payload;
    },
    setInitialState: (state, action) => {
      state = action.payload;
    },
    setInitialMeta: (state, action) => {
      const { profileId, profileName, lastUpdated, profileNotes } =
        action.payload;
      state.profileId = profileId;
      state.profileName = profileName;
      state.lastUpdated = lastUpdated;
      state.profileNotes = profileNotes;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setInitialMeta, setNotes } = resumeSlice.actions;

export default resumeSlice.reducer;
