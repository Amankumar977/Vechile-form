import { MongoClient } from "mongodb";

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
