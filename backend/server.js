import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const URL = process.env.MONGO;
const URL =
	"mongodb+srv://tnu:tnu2003@cluster0.4wwdy.mongodb.net/amazona?retryWrites=true&w=majority";

mongoose.connect(URL);

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
	res.send("Server is ready");
});

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 1122;
app.listen(port, () => {
	console.log(`Served at http://localhost:${port}`);
});
