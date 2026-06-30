"use client";

import { cn } from "@akex/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import {
	type ChangeEvent,
	type FocusEvent,
	type InputHTMLAttributes,
	useId,
	useState,
} from "react";

const inputVariants = cva(
	"peer w-full rounded-xl bg-transparent text-foreground outline-none transition-colors placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "border border-input focus:border-ring",
				filled: "border border-transparent bg-muted focus:bg-muted/70",
				ghost: "border-b border-input rounded-none focus:border-ring",
			},
			inputSize: {
				sm: "h-9 px-3 text-sm",
				default: "h-11 px-3.5 text-sm",
				lg: "h-13 px-4 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			inputSize: "default",
		},
	},
);

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	/** Floating label rendered inside the field. */
	label?: string;
	/** Error message — triggers a shake animation and destructive styling. */
	error?: string;
	/** Helper text shown below the field when there is no error. */
	helperText?: string;
}

function Input({
	className,
	variant = "default",
	inputSize = "default",
	label,
	error,
	helperText,
	id,
	value,
	defaultValue,
	placeholder,
	onFocus,
	onBlur,
	onChange,
	...props
}: InputProps) {
	const reactId = useId();
	const inputId = id ?? reactId;
	const messageId = `${inputId}-message`;

	const isControlled = value !== undefined;
	const [focused, setFocused] = useState(false);
	const [hasValue, setHasValue] = useState(Boolean(defaultValue ?? ""));

	const invalid = Boolean(error);
	const currentHasValue = isControlled ? Boolean(value) : hasValue;
	const isFloating = focused || currentHasValue || Boolean(placeholder);
	const message = error ?? helperText;

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		setFocused(true);
		onFocus?.(event);
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		setFocused(false);
		setHasValue(Boolean(event.target.value));
		onBlur?.(event);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setHasValue(Boolean(event.target.value));
		onChange?.(event);
	};

	return (
		<div data-slot="input-field" className="w-full">
			<motion.div
				data-slot="input-wrapper"
				data-invalid={invalid || undefined}
				className="relative"
				animate={invalid ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
			>
				<input
					id={inputId}
					data-slot="input"
					aria-invalid={invalid || undefined}
					aria-describedby={message ? messageId : undefined}
					className={cn(
						inputVariants({ variant, inputSize }),
						label && "pt-2",
						invalid &&
							"border-destructive focus:border-destructive text-destructive-foreground",
						focused && !invalid && "shadow-[0_0_0_3px_rgba(168,85,247,0.25)]",
						className,
					)}
					value={value}
					defaultValue={defaultValue}
					placeholder={placeholder}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					{...props}
				/>

				{label ? (
					<motion.label
						htmlFor={inputId}
						data-slot="input-label"
						className={cn(
							"absolute left-3.5 top-1/2 origin-left -translate-y-1/2 pointer-events-none select-none px-1 bg-background text-muted-foreground",
							invalid && "text-destructive",
							focused && !invalid && "text-ring",
						)}
						animate={
							isFloating
								? { y: -22, scale: 0.82, opacity: 1 }
								: { y: 0, scale: 1, opacity: 0.85 }
						}
						transition={{ type: "spring", stiffness: 420, damping: 30 }}
					>
						{label}
					</motion.label>
				) : null}
			</motion.div>

			<AnimatePresence mode="wait">
				{message ? (
					<motion.p
						key={message}
						id={messageId}
						role={invalid ? "alert" : undefined}
						data-slot="input-message"
						data-invalid={invalid || undefined}
						className={cn(
							"mt-1.5 text-xs",
							invalid ? "text-destructive" : "text-muted-foreground",
						)}
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.18 }}
					>
						{message}
					</motion.p>
				) : null}
			</AnimatePresence>
		</div>
	);
}

export { Input, inputVariants };
