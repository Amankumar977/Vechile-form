import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  isLoading: true,
  vehicleData: [],
  allOrders: [],
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
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});
export const getAllOrdersOfVehicle = (vehicleModel) => async (dispatch) => {
  try {
    let response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/order/getAllOrders/${vehicleModel}`
    );
    dispatch(setAllOrders(response.data.orders));
  } catch (error) {
    console.log("Error while fetching the orders", error);
  }
};
export const { setIsLoading, setVehicleData, setAllOrders } =
  vehicleDataReducer.actions;

export default vehicleDataReducer.reducer;
