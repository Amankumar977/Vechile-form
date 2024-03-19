// Import the required MongoClient from the 'mongodb' package
import { MongoClient } from "mongodb";

// Get the MongoDB connection URI from the environment variables
const uri = process.env.MONGO_URL;

// Define the name of the database
const dbName = "Rentify";

// Define the name of the collection where the data will be stored
const collectionName = "vehicles";

// Define an array of vehicle data objects to be inserted into the database
let vehicleData = [
  {
    vehicleName: "Mercedes-Benz C-Class",
    vehicleType: "SEDAN",
    vehicleModel: "Mercedes-Benz C-Class",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Toyota Camry",
    vehicleType: "SEDAN",
    vehicleModel: "Camry",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Ford F-150",
    vehicleType: "TRUCK",
    vehicleModel: "F-150",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Honda Civic",
    vehicleType: "SEDAN",
    vehicleModel: "Civic",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "BMW 3 Series",
    vehicleType: "SEDAN",
    vehicleModel: "3 Series",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Chevrolet Silverado",
    vehicleType: "TRUCK",
    vehicleModel: "Silverado",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Audi A4",
    vehicleType: "SEDAN",
    vehicleModel: "A4",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Nissan Altima",
    vehicleType: "SEDAN",
    vehicleModel: "Altima",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "GMC Sierra",
    vehicleType: "TRUCK",
    vehicleModel: "Sierra",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Hyundai Sonata",
    vehicleType: "SEDAN",
    vehicleModel: "Sonata",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Ram 1500",
    vehicleType: "TRUCK",
    vehicleModel: "1500",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Kia Optima",
    vehicleType: "SEDAN",
    vehicleModel: "Optima",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Mercedes-Benz E-Class",
    vehicleType: "SEDAN",
    vehicleModel: "Mercedes-Benz E-Class",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Ford Mustang",
    vehicleType: "SPORTS_CAR",
    vehicleModel: "Mustang",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Jeep Wrangler",
    vehicleType: "SUV",
    vehicleModel: "Wrangler",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Chevrolet Tahoe",
    vehicleType: "SUV",
    vehicleModel: "Tahoe",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Honda Accord",
    vehicleType: "SEDAN",
    vehicleModel: "Accord",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "BMW 5 Series",
    vehicleType: "SEDAN",
    vehicleModel: "5 Series",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Lexus RX",
    vehicleType: "SUV",
    vehicleModel: "RX",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Toyota Tacoma",
    vehicleType: "TRUCK",
    vehicleModel: "Tacoma",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Volkswagen Jetta",
    vehicleType: "SEDAN",
    vehicleModel: "Jetta",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Subaru Outback",
    vehicleType: "WAGON",
    vehicleModel: "Outback",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Tesla Model 3",
    vehicleType: "SEDAN",
    vehicleModel: "Model 3",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Dodge Charger",
    vehicleType: "SEDAN",
    vehicleModel: "Charger",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Jeep Grand Cherokee",
    vehicleType: "SUV",
    vehicleModel: "Grand Cherokee",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Chevrolet Camaro",
    vehicleType: "SPORTS_CAR",
    vehicleModel: "Camaro",
    wheelType: "FOUR_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Honda Activa",
    vehicleType: "SCOOTER",
    vehicleModel: "Activa",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Suzuki Access",
    vehicleType: "SCOOTER",
    vehicleModel: "Access",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "TVS Jupiter",
    vehicleType: "SCOOTER",
    vehicleModel: "Jupiter",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Hero Splendor",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Splendor",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Bajaj Pulsar",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Pulsar",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Royal Enfield Classic",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Classic",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Yamaha FZ",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "FZ",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "KTM Duke",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Duke",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Honda CB Shine",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "CB Shine",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Hero HF Deluxe",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "HF Deluxe",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "TVS Apache",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Apache",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Bajaj Platina",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "Platina",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Suzuki Hayabusa",
    vehicleType: "SPORTS_BIKE",
    vehicleModel: "Hayabusa",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Kawasaki Ninja",
    vehicleType: "SPORTS_BIKE",
    vehicleModel: "Ninja",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Ducati Panigale",
    vehicleType: "SPORTS_BIKE",
    vehicleModel: "Panigale",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "BMW S1000RR",
    vehicleType: "SPORTS_BIKE",
    vehicleModel: "S1000RR",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Harley-Davidson Street",
    vehicleType: "CRUISER",
    vehicleModel: "Street",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Indian Scout",
    vehicleType: "CRUISER",
    vehicleModel: "Scout",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Triumph Bonneville",
    vehicleType: "CRUISER",
    vehicleModel: "Bonneville",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Victory Octane",
    vehicleType: "CRUISER",
    vehicleModel: "Octane",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Moto Guzzi V7",
    vehicleType: "CRUISER",
    vehicleModel: "V7",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Ducati Diavel",
    vehicleType: "CRUISER",
    vehicleModel: "Diavel",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Aprilia Tuono",
    vehicleType: "SPORTS_TOURER",
    vehicleModel: "Tuono",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "KTM Super Duke",
    vehicleType: "SPORTS_TOURER",
    vehicleModel: "Super Duke",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "BMW R1250GS",
    vehicleType: "ADVENTURE",
    vehicleModel: "R1250GS",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Honda Africa Twin",
    vehicleType: "ADVENTURE",
    vehicleModel: "Africa Twin",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
  {
    vehicleName: "Kawasaki Versys",
    vehicleType: "ADVENTURE",
    vehicleModel: "Africa Twin",
    wheelType: "TWO_WHEELER",
    startDate: "",
    endDate: "",
  },
];

// Define an asynchronous function to seed the data into the database
async function seedData() {
  // Create a new MongoClient instance with the connection URI and options
  const client = new MongoClient(uri);

  try {
    // Attempt to establish a connection to the MongoDB database
    await client.connect();
    console.log("MongoDB Connected for Seed Data");

    // Get a reference to the database
    const db = client.db(dbName);

    // Get a reference to the collection where the data will be stored
    const collection = db.collection(collectionName);

    // Insert the array of vehicle data objects into the collection
    const result = await collection.insertMany(vehicleData);
    console.log(
      `${result.insertedCount} documents inserted into the collection`
    );
  } catch (error) {
    // Handle any errors that occur during the seeding process
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection, regardless of whether an error occurred
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}
// Call the seedData function to initiate the data seeding process
seedData();
