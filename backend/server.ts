import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import morgan from "morgan";
import authRoutes from "./routes/authRoute";
import categoryRoutes from "./routes/categoryRoutes";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT;
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use(morgan("dev"));
// import userRoute from "./routes/userRoutes";

app.get("/", (req, res) => {
  res.send("welcome to server");
});
// app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
