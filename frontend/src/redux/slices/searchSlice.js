import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

const initialState = {
  results: { topics: [], lessons: [] },
  query: '',
  isLoading: false,
  isError: false,
  message: '',
};

// Search
export const search = createAsyncThunk(
  'search/query',
  async (query, thunkAPI) => {
    try {
      const response = await apiClient.get(`/search?q=${query}`);
      return { ...response.data, query };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = { topics: [], lessons: [] };
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.data;
        state.query = action.payload.query;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
