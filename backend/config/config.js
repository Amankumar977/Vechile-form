import mongoose from "mongoose";
function connectToDb() {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Database connection established");
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
}
export default connectToDb;
