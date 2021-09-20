import { configureStore } from "@reduxjs/toolkit";
import resumereducers from "../resume/modules/resumereducers";
import skillsReducer from "../resume/modules/skills/reducers";
import workHistoryReducer from "../resume/modules/workhistory/reducers";
import educationReducer from "../resume/modules/education/reducers";
// ...

const store = configureStore({
  reducer: {
    skills: skillsReducer,
    workHistory: workHistoryReducer,
    education: educationReducer,
    meta: resumereducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
