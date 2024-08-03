import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://yabusha:yabusha@cluster0.bov12er.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(
    app.listen(3001, () => {
      console.log("connected sussfully and run on 3001");
    })
  );

app.use("/user", userRoutes);
