import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './configs/mongodb.js';

//initializing Express
const app = express();

//middleware
app.use(cors())

//connect mongodb
await connectDB()

//Routes
app.get('/',(req, res)=>{
    res.send("API working")
})

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port`,PORT)
})