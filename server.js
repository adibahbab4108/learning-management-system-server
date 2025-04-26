import express from "express";
import cors from "cors";
import { connectDB } from "./configs/mongodb.js";
import { config } from "dotenv";
import eudcatorRouter from "./routes/educatorRoutes.js";

//initializing Express
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //for parsing JSON body

//connect mongodb
await connectDB();

//Routes
app.get("/", (req, res) => {
  res.send("API working");
});
app.use('/api/educator',eudcatorRouter)
app.use('api/users',userRoutes)



//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
