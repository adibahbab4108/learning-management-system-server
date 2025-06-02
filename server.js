import express from "express";
import cors from "cors";
import { PORT, MONGODB_URI } from "./configs/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import educatorRouter from "./routes/educator.routes.js";

//initializing Express
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //for parsing JSON body
// app.use(errorMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/educator", educatorRouter);

//handling Route not found
app.use((req,res,next)=>{
  res.status(404).json({message: "Route not found"})
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
