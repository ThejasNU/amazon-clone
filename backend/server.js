import express from "express";
import data from "./data.js";

const app = express();

app.get("/", (req, res) => {
	res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
	res.send(data.products);
});

const port = process.env.PORT || 1122;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
