import { createSlice } from "@reduxjs/toolkit";

// Retrieve stored order details from localStorage
const storedOrderData = localStorage.getItem("orderData");

// Parse stored order details if available, otherwise use default empty strings
const initialState = storedOrderData
  ? JSON.parse(storedOrderData)
  : {
      firstName: "",
      lastName: "",
      numberOfWheels: "",
      vehicleType: "",
      vehicleModel: "",
      startDate: "",
      endDate: "",
    };

// Define the orderData slice
const orderData = createSlice({
  name: "orderData",
  initialState,
  reducers: {
    // Define reducers to set individual fields
    setFirstName: (state, action) => {
      state.firstName = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, firstName: action.payload })
      );
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, lastName: action.payload })
      );
    },
    setNumberOfWheels: (state, action) => {
      state.numberOfWheels = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, numberOfWheels: action.payload })
      );
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, vehicleType: action.payload })
      );
    },
    setVehicleModel: (state, action) => {
      state.vehicleModel = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, vehicleModel: action.payload })
      );
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, startDate: action.payload })
      );
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
      localStorage.setItem(
        "orderData",
        JSON.stringify({ ...state, endDate: action.payload })
      );
    },
  },
});

// Export action creators
export const {
  setEndDate,
  setFirstName,
  setLastName,
  setNumberOfWheels,
  setStartDate,
  setVehicleModel,
  setVehicleType,
} = orderData.actions;

// Export reducer
export default orderData.reducer;
