import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema for an order
const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [20, "Maximum length for first name is 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [20, "Maximum length for last name is 20 characters"],
    },
    numberOfWheels: {
      type: Number,
      required: [true, "Number of wheels is required"],
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
    },
    vehicleModel: {
      type: String,
      required: [true, "Vehicle model is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    vehicleId: {
      type: String,
      required: [true, "vehicle Id is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields to documents
);

// Create a model based on the schema
const Order = model("Order", orderSchema);

// Export the Order model
export default Order;
