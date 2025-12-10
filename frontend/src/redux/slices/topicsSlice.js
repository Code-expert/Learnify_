import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

const initialState = {
  topics: [],
  currentTopic: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get all topics (public)
export const getTopics = createAsyncThunk(
  'topics/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/topics');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get topic by slug with lessons
export const getTopicBySlug = createAsyncThunk(
  'topics/getBySlug',
  async (slug, thunkAPI) => {
    try {
      console.log('🔄 Fetching topic:', slug);
      
      const response = await apiClient.get(`/topics/${slug}`);
      
      console.log('✅ Topic response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Topic fetch error:', error);
      
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Admin: Create topic
export const createTopic = createAsyncThunk(
  'topics/create',
  async (topicData, thunkAPI) => {
    try {
      const response = await apiClient.post('/admin/topics', topicData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Update topic
export const updateTopic = createAsyncThunk(
  'topics/update',
  async ({ id, topicData }, thunkAPI) => {
    try {
      const response = await apiClient.put(`/admin/topics/${id}`, topicData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin: Delete topic
export const deleteTopic = createAsyncThunk(
  'topics/delete',
  async (id, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/admin/topics/${id}`);
      return { id, ...response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get topics
      .addCase(getTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.topics = action.payload.data;
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get topic by slug
      .addCase(getTopicBySlug.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getTopicBySlug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentTopic = action.payload; // Store entire response
    })
    .addCase(getTopicBySlug.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.currentTopic = null;
    })
      // Create topic
      .addCase(createTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload.data);
      })
      // Update topic
      .addCase(updateTopic.fulfilled, (state, action) => {
        const index = state.topics.findIndex(t => t._id === action.payload.data._id);
        if (index !== -1) {
          state.topics[index] = action.payload.data;
        }
      })
      // Delete topic
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.topics = state.topics.filter(t => t._id !== action.payload.id);
      });
  },
});

export const { reset } = topicsSlice.actions;
export default topicsSlice.reducer;
