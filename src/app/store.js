import { configureStore } from "@reduxjs/toolkit";
import searchBoxesReducer from "../components/searchBoxes/searchBoxesSlice";
import routeCalculatorReducer from "../components/routeCalculator/routeCalculatorSlice";

export const store = configureStore({
  reducer: {
    places: searchBoxesReducer,
    routes: routeCalculatorReducer,
  },
});
