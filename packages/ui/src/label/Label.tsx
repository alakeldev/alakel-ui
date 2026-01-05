import * as React from "react";
import { cn } from "../lib/utils";

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	className?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, children, htmlFor, ...props }, ref) => {
		const classes = cn("text-sm font-medium leading-none", className);

		if (htmlFor) {
			return (
				<label ref={ref} htmlFor={htmlFor} className={classes} {...props}>
					{children}
				</label>
			);
		}

		return (
			<span
				ref={ref as React.Ref<HTMLSpanElement>}
				className={classes}
				{...props}
			>
				{children}
			</span>
		);
	},
);

Label.displayName = "Label";
