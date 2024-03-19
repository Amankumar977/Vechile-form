import { configureStore } from "@reduxjs/toolkit";
import vehicleDataReducer from "./reducers/vehicleData";
import orderDataReducer from "./reducers/orderData";
let store = configureStore({
  reducer: {
    vehicleData: vehicleDataReducer,
    orderData: orderDataReducer,
  },
});
export default store;
