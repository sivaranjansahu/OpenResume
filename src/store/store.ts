import { configureStore, createSlice } from "@reduxjs/toolkit";
import resumereducers from "../resume/modules/resumereducers";
import skillsReducer from "../resume/modules/skills/reducers";
import workHistoryReducer from "../resume/modules/workhistory/reducers";
import educationReducer from "../resume/modules/education/reducers";
import basicInfoReducer from "../resume/modules/basicinfo/reducers";
import linksReducer from "../resume/modules/links/reducers";
import projectsReducer from "../resume/modules/projects/reducers";
import summaryReducer from "../resume/modules/summary/reducers";
import coursesReducer from "../resume/modules/courses/reducers";
// ...

const dirtySlice = createSlice({
  name: "dirty",
  initialState: { isDirty: false },
  reducers: {
    setDirty: (state, action) => {
      state.isDirty = action.payload.isDirty;
    },
  },
});
export const { setDirty } = dirtySlice.actions;

const orderSlice = createSlice({
  name:"componentOrder",
  initialState:{order:["summary","workExperience","skills","education","courses","projects","links"]},
  reducers:{
    setOrder: (state, action) => {
      state.order = action.payload.order;
    },
  }

})
export const { setOrder } = orderSlice.actions;

const store = configureStore({
  reducer: {
    skills: skillsReducer,
    workHistory: workHistoryReducer,
    education: educationReducer,
    basicInfo: basicInfoReducer,
    meta: resumereducers,
    links: linksReducer,
    projects: projectsReducer,
    summary: summaryReducer,
    courses: coursesReducer,
    dirty: dirtySlice.reducer,
    componentOrder:orderSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
