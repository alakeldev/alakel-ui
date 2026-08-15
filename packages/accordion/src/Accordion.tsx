"use client";

import { cn } from "@alakel/utils";
import { AnimatePresence, motion } from "motion/react";
import {
	createContext,
	type HTMLAttributes,
	type ReactNode,
	useContext,
	useId,
	useState,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type AccordionContextValue = {
	openValues: string[];
	toggle: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion(component: string): AccordionContextValue {
	const ctx = useContext(AccordionContext);
	if (!ctx) {
		throw new Error(`<${component}> must be used inside <Accordion>.`);
	}
	return ctx;
}

type AccordionItemContextValue = {
	value: string;
	open: boolean;
	triggerId: string;
	contentId: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
	null,
);

function useAccordionItem(component: string): AccordionItemContextValue {
	const ctx = useContext(AccordionItemContext);
	if (!ctx) {
		throw new Error(`<${component}> must be used inside <AccordionItem>.`);
	}
	return ctx;
}

function normalize(value?: string | string[]): string[] {
	if (value === undefined) {
		return [];
	}
	return Array.isArray(value) ? value : [value];
}

// ---------------------------------------------------------------------------
// Accordion (root)
// ---------------------------------------------------------------------------

export interface AccordionProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** "single" closes other items on open; "multiple" allows many open. */
	type?: "single" | "multiple";
	/** Initially open value(s) when uncontrolled. */
	defaultValue?: string | string[];
	/** Controlled open value(s). */
	value?: string | string[];
	/** Called with the new open values whenever an item toggles. */
	onValueChange?: (value: string[]) => void;
	children: ReactNode;
}

function Accordion({
	type = "single",
	defaultValue,
	value,
	onValueChange,
	className,
	children,
	...props
}: AccordionProps) {
	const isControlled = value !== undefined;
	const [internal, setInternal] = useState<string[]>(() =>
		normalize(defaultValue),
	);
	const openValues = isControlled ? normalize(value) : internal;

	const toggle = (itemValue: string) => {
		const isOpen = openValues.includes(itemValue);
		let next: string[];

		if (type === "single") {
			next = isOpen ? [] : [itemValue];
		} else {
			next = isOpen
				? openValues.filter((v) => v !== itemValue)
				: [...openValues, itemValue];
		}

		if (!isControlled) {
			setInternal(next);
		}
		onValueChange?.(next);
	};

	return (
		<AccordionContext.Provider value={{ openValues, toggle }}>
			<div
				data-slot="accordion"
				className={cn("w-full divide-y divide-border", className)}
				{...props}
			>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Unique identifier for this item. */
	value: string;
}

function AccordionItem({
	value,
	className,
	children,
	...props
}: AccordionItemProps) {
	const { openValues } = useAccordion("AccordionItem");
	const reactId = useId();
	const open = openValues.includes(value);

	return (
		<AccordionItemContext.Provider
			value={{
				value,
				open,
				triggerId: `${reactId}-trigger`,
				contentId: `${reactId}-content`,
			}}
		>
			<div
				data-slot="accordion-item"
				data-state={open ? "open" : "closed"}
				className={className}
				{...props}
			>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
}

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

export type AccordionTriggerProps = HTMLAttributes<HTMLButtonElement>;

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionTriggerProps) {
	const { toggle } = useAccordion("AccordionTrigger");
	const { value, open, triggerId, contentId } =
		useAccordionItem("AccordionTrigger");

	return (
		<button
			type="button"
			id={triggerId}
			data-slot="accordion-trigger"
			data-state={open ? "open" : "closed"}
			aria-expanded={open}
			aria-controls={contentId}
			onClick={() => toggle(value)}
			className={cn(
				"flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		>
			<span>{children}</span>
			<motion.span
				aria-hidden
				data-slot="accordion-chevron"
				className="shrink-0 text-muted-foreground"
				animate={{ rotate: open ? 180 : 0 }}
				transition={{ type: "spring", stiffness: 400, damping: 28 }}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					role="presentation"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</motion.span>
		</button>
	);
}

// ---------------------------------------------------------------------------
// AccordionContent
// ---------------------------------------------------------------------------

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

function AccordionContent({
	className,
	children,
	...props
}: AccordionContentProps) {
	const { open, triggerId, contentId } = useAccordionItem("AccordionContent");

	return (
		<AnimatePresence initial={false}>
			{open ? (
				<motion.div
					id={contentId}
					role="region"
					aria-labelledby={triggerId}
					data-slot="accordion-content"
					className="overflow-hidden"
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
				>
					<div
						className={cn("pb-4 text-sm text-muted-foreground", className)}
						{...props}
					>
						{children}
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
