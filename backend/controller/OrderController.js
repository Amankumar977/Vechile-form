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

// Function to handle updating vehicle dates
export async function handleUpdateVehicleDate(req, res) {
  let client;
  try {
    // Extracting required details from the request body
    const { id, startDate, endDate } = req.body;

    // Checking if all required details are provided
    if (!id || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    // Getting the MongoDB URI from environment variables
    const uri = process.env.MONGO_URL;
    client = new MongoClient(uri); // Creating a new MongoDB client
    await client.connect(); // Connecting to the MongoDB database

    // Accessing the database and the collection of vehicles
    const db = client.db();
    const collection = db.collection("vehicles");

    // Finding and updating the vehicle with the provided ID
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Corrected instantiation of ObjectId
      { $set: { startDate, endDate } },
      { returnOriginal: false }
    );

    // If no vehicle is found with the provided ID, return a 404 status with an error message
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No vehicle found with the provided ID",
      });
    }

    // If vehicle details are successfully updated, return a 200 status with the updated data
    return res.status(200).json({
      success: true,
      message: "Vehicle details updated successfully",
      data: result.value,
    });
  } catch (error) {
    // If an error occurs during updating, return a 500 status with the error message
    console.error("Error in updating the vehicle details", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    // Closing the MongoDB client connection in the finally block
    if (client) await client.close();
  }
}

// Function to handle creating an order
export async function handleCreateOrder(req, res) {
  try {
    // Extracting final order details from the request body
    const { finalOrder } = req.body;

    // Checking if final order details are provided
    if (!finalOrder) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
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
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error.message);
    // If an error occurs during order creation, return a 500 status with an error message
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function handleGetAllOrders(req, res) {
  try {
    const { vehicleModel } = req.params;
    if (!vehicleModel) {
      return res.status(400).json({
        success: false,
        message: "Please provide the vehicle model",
      });
    }
    // Fetch all orders of vehicle from the database
    let orders = await Order.find({ vehicleModel: vehicleModel }).sort({
      startDate: 1,
    });

    // Check if any orders are found
    if (orders.length === 0) {
      // If no orders are found, return a 404 status with a message
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }
    // If orders are found, return a 200 status with the orders
    return res.status(200).json({
      success: true,
      message: "Order fetched",
      orders,
    });
  } catch (error) {
    // If an error occurs during order fetching, log the error and return a 500 status with an error message
    console.log("Error while getting the orders", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
