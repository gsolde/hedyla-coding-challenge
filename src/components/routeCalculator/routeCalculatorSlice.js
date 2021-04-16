import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { status: "idle" };

export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async (places) => {
  const response = await fetch(
    `http://router.project-osrm.org/route/v1/driving/2.2450325,41.4469883;2.1734035,41.3850639?alternatives=true&geometries=polyline&steps=true`
  );
  return response.data;
});

export const routeCalculatorSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    addRoutes: (state, action) => {
      state.routes = action.payload;
    },
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

export const { addRoutes } = routeCalculatorSlice.actions;

export default routeCalculatorSlice.reducer;
