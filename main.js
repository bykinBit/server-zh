import app from "./src/app/index.js";
import connectDB from "./src/app/database.js";
import "dotenv/config";
const PORT = process.env.PORT || 8001;
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
