import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";

dotenv.config();

const app = express();

const URL = process.env.MONGO;
// console.log(URL);
mongoose.connect(URL);

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
	res.send("Server is ready");
});

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 1122;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
