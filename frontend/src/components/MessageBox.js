const MessageBox = (props) => {
	return (
		<div>
			<div className={`alert alert-${props.variant || "info"}`}>
				{props.children}
			</div>
		</div>
	);
};

export default MessageBox;
