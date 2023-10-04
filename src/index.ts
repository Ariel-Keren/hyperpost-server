import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import auth from "./routes/auth";
import user from "./routes/user";
import hypers from "./routes/hypers";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/users/:username", user);
app.use("/hypers", hypers);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
