import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoute from "./routes/admin.js"
import userRoute from "./routes/user.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/admin" , adminRoute);
app.use("/user", userRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
