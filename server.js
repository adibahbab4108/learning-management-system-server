import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, MONGODB_URI } from "./configs/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import educatorRouter from "./routes/educator.routes.js";
import courseRouter from "./routes/course.route.js";
import { stripeWebhooks } from "./controllers/webhooks.controller.js";

//initializing Express
const app = express();

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Place the /stripe route before express.json() to work seperately. otherwise a conflict occu with express.json() middleware
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks); // this endpoint automatically hit by stripe after purchase

app.use(express.json()); //for parsing JSON body
app.use(cookieParser()); // automatically set req.cookies and accessible to eevry req
// app.use(errorMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send(`API working Perfectly. Time: ${new Date().toISOString()}`);
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/educator", educatorRouter);
app.use("/api/v1/course", courseRouter);

//handling Route not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


if (process.env.NODE_ENV !== "production") {
  connectToDatabase().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}
