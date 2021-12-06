import jwt from "jsonwebtoken";
import Order from "./models/orderModel.js";

export const generateToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "60d",
		}
	);
};

export const isAuth = (req, res, next) => {
	const authorisation = req.headers.authorisation;
	if (authorisation) {
		const token = authorisation.slice(7, authorisation.length); //Bearer xxxxxxxxxxxx
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: "Invalid Token" });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: "No Token" });
	}
};
