import express from "express";
import {
  handleGetAllVehicles,
  handleCreateOrder,
} from "../controller/OrderController.js";
const router = express.Router();
/**GET ROUTE */
router.route("/getAllVechiles").get(handleGetAllVehicles);
/**POST ROUTE */
router.route("/createOrder").post(handleCreateOrder);
export default router;
