import Product from "../components/Product";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	console.log(products, loading);
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="row center">
					{products.map((product) => (
						<Product key={product._id} product={product}></Product>
					))}
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
