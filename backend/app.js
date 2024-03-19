// Importing required modules
import express from "express";
import "dotenv/config"; // Importing dotenv for environment variables
import cors from "cors"; // Importing CORS for cross-origin resource sharing
import morgan from "morgan"; // Importing Morgan for HTTP request logging
import orderRoute from "./routes/orderRoute.js"; // Importing routes for orders

// Creating an instance of Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests with extended option set to true
app.use(express.urlencoded({ extended: true }));

// Disabling the "x-powered-by" header for security reasons
app.disable("x-powered-by");

// Middleware for HTTP request logging with "tiny" format
app.use(morgan("tiny"));

// Middleware for enabling CORS with specific configuration
app.use(
  cors({
    origin: [process.env.FRONT_END_URL], // Allowing requests only from the specified front-end URL
    secure: true, // Enforcing secure connections
    httpOnly: true, // Restricting access to cookies to HTTP requests only
  })
);
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Hello World",
  });
});

// Mounting the order routes at the specified endpoint
app.use("/api/v1/order", orderRoute);

// Exporting the configured Express application
export default app;
