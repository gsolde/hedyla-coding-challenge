import { configureStore } from "@reduxjs/toolkit";
import searchBoxesReducer from "../components/searchBoxes/searchBoxesSlice";

export const store = configureStore({
  reducer: {
    places: searchBoxesReducer,
  },
});
