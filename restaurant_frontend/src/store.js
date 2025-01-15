import { configureStore } from "@reduxjs/toolkit";
import selectedResultsReducer from "./selectedResultsSlice";

export const store = configureStore({
  reducer: {
    selectedResults: selectedResultsReducer,
  },
});
