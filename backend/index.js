import app from "./app.js";
import connectToDb from "./config/config.js";
const PORT = process.env.PORT;

connectToDb();
app.listen(PORT, () => {
  console.log("The server has started at", PORT);
});
