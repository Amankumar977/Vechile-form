import { MongoClient, ObjectId } from "mongodb";
import Order from "../model/orderModel.js";
export async function handleGetAllVehicles(req, res) {
  const uri = process.env.MONGO_URL;

  let client;

  try {
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db();
    const collection = db.collection("vehicles"); // Corrected collection name
    const vehicles = await collection.find({}).toArray();
    if (vehicles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data fetched",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched",
      vehicles,
    });
  } catch (error) {
    console.error("Error in fetching the data", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
export async function handleUpdateVehicleDate(req, res) {
  let client;
  try {
    const { id, startDate, endDate } = req.body;
    if (!id || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
      });
    }

    const uri = process.env.MONGO_URL;
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db();
    const collection = db.collection("vehicles");

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Corrected instantiation of ObjectId
      { $set: { startDate, endDate } },
      { returnOriginal: false }
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No vehicle found with the provided ID",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle details updated successfully",
      data: result.value,
    });
  } catch (error) {
    console.error("Error in updating the vehicle details", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    if (client) await client.close();
  }
}

export async function handleCreateOrder(req, res) {
  try {
    const { finalOrder } = req.body;
    if (!finalOrder) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required details",
      });
    }
    const order = await Order.create(finalOrder);
    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Unable to create the order",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Order created sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
}
