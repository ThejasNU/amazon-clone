import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const URL = process.env.MONGO;
mongoose.connect(URL);

app.get("/api/products/:id", (req, res) => {
	const product = data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: "Product Not Found" });
	}
});

app.get("/api/products", (req, res) => {
	res.send(data.products);
});

app.use("/api/users", userRouter);

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
