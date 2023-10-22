import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import storyRoutes from './routes/stories.js'
import userRoutes from './routes/users.js'
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());
app.use("/stories", storyRoutes);
app.use("/user", userRoutes);


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URI).catch((error) => {
  console.log(error);
});

app.listen(PORT, () => {
  console.log('server is running on port:', PORT);
});
