import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { ORIGIN } from "./constants.js";
import { errorMiddleware } from "./middleware/error.js";

app.use(
  cors({
    origin: ORIGIN,
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: "Set-Cookie",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import seller from "./routes/shopRoute.js";
import category from "./routes/categoryRoute.js";
import baner from "./routes/banerRoute.js";
import catbaner from "./routes/catBanerRoute.js";

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", seller);
app.use("/api/v1", category);
app.use("/api/v1", baner);
app.use("/api/v1", catbaner);

app.get("/", async (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Beaworth server is running well!",
  });
});
// Middleware for Errors
app.use(errorMiddleware);

export default app;
