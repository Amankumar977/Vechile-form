import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLoading: true,
  vehicleData: [],
};
const vehicleDataReducer = createSlice({
  name: "vehicleData",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVehicleData: (state, action) => {
      state.vehicleData = action.payload;
    },
  },
});

export const { setIsLoading, setVehicleData } = vehicleDataReducer.actions;

export default vehicleDataReducer.reducer;
