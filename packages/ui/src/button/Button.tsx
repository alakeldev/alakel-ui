export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	children,
	...props
}) => {
	const baseStyle = "px-4 py-2 rounded font-semibold";
	const variantStyle =
		variant === "primary"
			? "bg-blue-500 text-white hover:bg-blue-600"
			: "bg-gray-200 text-gray-800 hover:bg-gray-300";

	return (
		<button className={`${baseStyle} ${variantStyle}`} {...props}>
			{children}
		</button>
	);
};
