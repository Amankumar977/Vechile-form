// Importing necessary modules from MongoDB and the order model
import { MongoClient, ObjectId } from "mongodb";
import Order from "../model/orderModel.js";

// Function to handle fetching all vehicles
export async function handleGetAllVehicles(req, res) {
  // Getting the MongoDB URI from environment variables
  const uri = process.env.MONGO_URL;

  let client;

  try {
    // Creating a new MongoDB client
    client = new MongoClient(uri);
    await client.connect(); // Connecting to the MongoDB database

    // Accessing the database and the collection of vehicles
    const db = client.db();
    const collection = db.collection("vehicles"); // Corrected collection name

    // Fetching all vehicles from the collection
    const vehicles = await collection.find({}).toArray();

    // If no vehicles are found, return a 404 status with an error message
    if (vehicles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data fetched",
      });
    }

    // If vehicles are found, return a 200 status with the fetched vehicles
    return res.status(200).json({
      success: true,
      message: "Data fetched",
      vehicles,
    });
  } catch (error) {
    // If an error occurs during fetching, return a 500 status with the error message
    console.error("Error in fetching the data", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    // Closing the MongoDB client connection in the finally block
    if (client) {
      await client.close();
    }
  }
}

// Function to handle creating an order
export async function handleCreateOrder(req, res) {
  try {
    // Extracting final order details from the request body
    const { finalOrder, vehicleId, newOrderStartDate, newOrderEndDate } =
      req.body;

    // Checking if final order details are provided
    if (!finalOrder || !vehicleId || !newOrderStartDate || !newOrderEndDate) {
      // If any required detail is missing, return a 400 status with an error message
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    // Check if the selected dates overlap with any existing orders for the same vehicle
    const overLappingDates = await Order.find({
      vehicleId: vehicleId,
      $or: [
        {
          // Check if the new order starts during an existing order
          $and: [
            { startDate: { $gte: newOrderStartDate, $lt: newOrderEndDate } },
            { endDate: { $gt: newOrderStartDate, $lte: newOrderEndDate } },
          ],
        },
        {
          // Check if the new order completely covers an existing order
          $and: [
            { startDate: { $lte: newOrderStartDate } },
            { endDate: { $gte: newOrderEndDate } },
          ],
        },
      ],
    });

    // If overlapping dates are found, return a 400 status with an appropriate message
    if (overLappingDates.length > 0) {
      return res.status(400).json({
        success: false,
        message: "The selected dates are not available.",
      });
    }

    // Creating the order using the Order model
    const order = await Order.create(finalOrder);

    // If order creation is successful, return a 201 status with a success message
    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Unable to create the order",
      });
    }

    // If order creation is successful, return a 201 status with a success message
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    // Log any errors that occur during order creation
    console.log(error.message);
    // If an error occurs during order creation, return a 500 status with an error message
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
