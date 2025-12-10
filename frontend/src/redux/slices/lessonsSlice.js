import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

const initialState = {
  lessons: [],
  currentLesson: null,
  isLoading: false,
  isError: false,
  message: '',
};

// Get lesson by slug
export const getLessonBySlug = createAsyncThunk(
  'lessons/getBySlug',
  async (slug, thunkAPI) => {
    try {
      const response = await apiClient.get(`/lessons/${slug}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Create lesson
export const createLesson = createAsyncThunk(
  'lessons/create',
  async (lessonData, thunkAPI) => {
    try {
      const response = await apiClient.post('/admin/lessons', lessonData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Update lesson
export const updateLesson = createAsyncThunk(
  'lessons/update',
  async ({ id, lessonData }, thunkAPI) => {
    try {
      const response = await apiClient.put(`/admin/lessons/${id}`, lessonData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Delete lesson
export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async (id, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/admin/lessons/${id}`);
      return { id, ...response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLessonBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLessonBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLesson = action.payload.data;
      })
      .addCase(getLessonBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;
