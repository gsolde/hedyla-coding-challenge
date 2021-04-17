import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async (places) => {
  const res = await fetch(
    `http://router.project-osrm.org/route/v1/driving/${places.origin.lng},${places.origin.lat};${places.destination.lng},${places.destination.lat}?alternatives=true&geometries=polyline&steps=true`
  );
  const routes = await res.json();
  return routes;
});

export const routeCalculatorSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    addRoutes: (state, action) => {
      state.routes = action.payload;
    },
    resetRoutesState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = "success";
        state.routes = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectRoutes = (state) => state.routes.routes;

export const { addRoutes, resetRoutesState } = routeCalculatorSlice.actions;

export default routeCalculatorSlice.reducer;
