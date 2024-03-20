import express from "express";
import {
  handleGetAllVehicles,
  handleUpdateVehicleDate,
  handleCreateOrder,
  handleGetAllOrders,
} from "../controller/OrderController.js";
const router = express.Router();
/**GET ROUTE */
router.route("/getAllVechiles").get(handleGetAllVehicles);
router.route("/getAllOrders/:vehicleModel").get(handleGetAllOrders);
/**PUT ROUTE */
router.route("/updateVehicleDate").put(handleUpdateVehicleDate);
/**POST ROUTE */
router.route("/createOrder").post(handleCreateOrder);
export default router;
