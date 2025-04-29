import express from "express";
import cors from "cors";
import { PORT, MONGODB_URI } from "./configs/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";

//initializing Express
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //for parsing JSON body

//connect mongodb


//Routes
app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toLocaleDateString()}`);
});
app.use("api/v1/auth", authRouter);
app.use("api/v1/users", userRouter);

app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase()
});
