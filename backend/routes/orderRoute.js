import express from "express";
import { handleGetAllVehicles } from "../controller/OrderController.js";
const router = express.Router();
/**GET ROUTE */
router.route("/getAllVechiles").get(handleGetAllVehicles);
/**POST ROUTE */
export default router;
