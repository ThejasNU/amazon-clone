import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import { CART_EMPTY } from "./constants/cartConstants";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";

function App(props) {
	const cart = useSelector((state) => state.cart);
	let { cartItems } = cart;
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();
	const signoutHandler = () => {
		dispatch(signout());
		dispatch({ type: CART_EMPTY });
		localStorage.removeItem("cartItems");
	};

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<Link className="brand" to="/">
							amazona
						</Link>
					</div>
					<div>
						<Link to="/cart">
							Cart
							{cartItems.length > 0 && (
								<span className="badge">
									{cartItems.length}
								</span>
							)}
						</Link>
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name}{" "}
									<i className="fa fa-caret-down"></i>{" "}
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/" onClick={signoutHandler}>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<main>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route
						path="/product/:id"
						component={ProductScreen}
					></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route
						path="/shipping"
						component={ShippingAddressScreen}
					></Route>
					<Route
						path="/payment"
						component={PaymentMethodScreen}
					></Route>
					<Route
						path="/placeorder"
						component={PlaceOrderScreen}
					></Route>
					<Route exact path="/" component={HomeScreen}></Route>
				</main>
				<footer className="row center">All rights reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
