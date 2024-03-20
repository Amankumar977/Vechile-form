// Importing the Express application instance and the function to connect to the database
import app from "./app.js";
import connectToDb from "./config/config.js";

// Getting the port from the environment variables
const PORT = process.env.PORT;

// Connecting to the database
connectToDb();

// Starting the Express server by listening on the specified port
app.listen(PORT, () => {
  console.log("The server has started at", PORT);
});
