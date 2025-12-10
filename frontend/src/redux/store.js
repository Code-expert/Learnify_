import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import topicsReducer from './slices/topicsSlice';
import lessonsReducer from './slices/lessonsSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
    lessons: lessonsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
