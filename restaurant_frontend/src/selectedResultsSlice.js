import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInitialResults = createAsyncThunk(
  "selectedResults/fetchInitialResults",
  async () => {
    const response = await fetch(
      "https://ccrestaurantapi.azurewebsites.net/api/get_all_restaurants"
    );
    const data = await response.json();
    return data;
  }
);

const selectedResultsSlice = createSlice({
  name: "selectedResults",
  initialState: {
    results: [], 
    status: "idle", 
    error: null, 
  },
  reducers: {
    toggleRegion: (state, action) => {
      const region = action.payload;
      if (state.results.includes(region)) {
        state.results = state.results.filter((r) => r !== region);
      } else {
        state.results.push(region);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialResults.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchInitialResults.fulfilled, (state, action) => {
        state.status = "succeeded"; 
        state.results = action.payload; 
      })
      .addCase(fetchInitialResults.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.error.message; 
      });
  },
});

export const { toggleRegion } = selectedResultsSlice.actions;

export default selectedResultsSlice.reducer;
