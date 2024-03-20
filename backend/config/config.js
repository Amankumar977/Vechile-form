// Importing the mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
function connectToDb() {
  try {
    // Connecting to the MongoDB database using the provided URL
    mongoose
      .connect(process.env.MONGO_URL) // Using environment variable for MongoDB URL
      .then(() => {
        // If connection is successful, log a message indicating success
        console.log("Database connection established");
      })
      .catch((error) => {
        // If there's an error connecting to the database, log the error message
        console.log(error.message);
      });
  } catch (error) {
    // If there's any general error during the connection attempt, log the error message
    console.log(error.message);
  }
}

// Exporting the function to make it accessible from other files
export default connectToDb;
