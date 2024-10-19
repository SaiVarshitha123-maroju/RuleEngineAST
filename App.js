import express from "express";
import mongoose from "mongoose";
import router from "./API.js";
import cors from "cors";
("./API.js");
const MONGO_URL =
  "mongodb+srv://user1:Varshitha@cluster0.watk3uy.mongodb.net/rule_engine_db";

try {
  const conn = await mongoose.connect(MONGO_URL);
  console.log("connected to mongodb Databse");
} catch (error) {
  console.log("error in mongodb");
}

const app = express();
app.use(express.json());

app.use(cors());
app.use("/rules", router);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
