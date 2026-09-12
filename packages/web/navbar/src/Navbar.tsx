"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { Transition } from "motion/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import "./styles.css";
import type {
	NavbarBrand,
	NavbarDropdownItem,
	NavbarItem,
	NavbarLinkItem,
	NavbarMotion,
	NavbarProps,
} from "./types";

type NavigateHandler = NonNullable<NavbarProps["onNavigate"]>;

function joinClassNames(...names: Array<string | false | undefined>) {
	return names.filter(Boolean).join(" ");
}

function isCurrentLink(item: NavbarLinkItem, activeHref?: string) {
	return activeHref !== undefined && item.href === activeHref;
}

function linkTargetProps(external?: boolean) {
	return external ? { rel: "noopener noreferrer", target: "_blank" } : {};
}

function getMotionTransition(
	preset: Exclude<NavbarMotion, "none">,
	surface: "dropdown" | "drawer" | "navigation",
): Transition {
	if (preset === "spring") {
		return {
			type: "spring",
			stiffness:
				surface === "drawer" ? 320 : surface === "navigation" ? 360 : 420,
			damping: surface === "dropdown" ? 30 : 34,
			mass: 0.8,
		};
	}

	return {
		type: "tween",
		duration: preset === "subtle" ? 0.16 : 0.26,
		ease: [0.22, 1, 0.36, 1],
	};
}

function Brand({
	brand,
	motionPreset,
}: {
	brand: NavbarBrand;
	motionPreset: NavbarMotion;
}) {
	if (!brand.href) {
		return <div className="ak-navbar__brand">{brand.content}</div>;
	}

	return (
		<motion.a
			aria-label={brand.ariaLabel}
			className="ak-navbar__brand ak-navbar__focus"
			href={brand.href}
			transition={
				motionPreset === "none"
					? { duration: 0 }
					: getMotionTransition(motionPreset, "navigation")
			}
			whileHover={motionPreset === "none" ? undefined : { scale: 1.03, y: -1 }}
			whileTap={motionPreset === "none" ? undefined : { scale: 0.98 }}
		>
			{brand.content}
		</motion.a>
	);
}

function ChevronIcon() {
	return (
		<svg aria-hidden="true" className="ak-navbar__chevron" viewBox="0 0 16 16">
			<path d="m4 6 4 4 4-4" />
		</svg>
	);
}

function MenuIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path d="M4 7h16M4 12h16M4 17h16" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path d="m6 6 12 12M18 6 6 18" />
		</svg>
	);
}

function DesktopLink({
	item,
	activeHref,
	motionPreset,
	showActiveIndicator,
	onNavigate,
}: {
	item: NavbarLinkItem;
	activeHref?: string;
	motionPreset: NavbarMotion;
	showActiveIndicator: boolean;
	onNavigate?: NavigateHandler;
}) {
	const isCurrent = isCurrentLink(item, activeHref);
	const itemTransition =
		motionPreset === "none"
			? { duration: 0 }
			: getMotionTransition(motionPreset, "navigation");

	return (
		<NavigationMenu.Item asChild>
			<motion.li
				className="ak-navbar__item"
				layout={motionPreset === "none" ? false : "position"}
				transition={itemTransition}
			>
				<NavigationMenu.Link asChild active={isCurrent}>
					<motion.a
						aria-current={isCurrent ? "page" : undefined}
						className="ak-navbar__link ak-navbar__focus"
						href={item.href}
						onClick={(event) => onNavigate?.(item, event)}
						transition={
							motionPreset === "none"
								? { duration: 0 }
								: getMotionTransition(motionPreset, "navigation")
						}
						whileHover={motionPreset === "none" ? undefined : { y: -2 }}
						whileTap={motionPreset === "none" ? undefined : { scale: 0.97 }}
						{...linkTargetProps(item.external)}
					>
						{item.label}
						{isCurrent && showActiveIndicator ? (
							<motion.span
								animate={{ scaleX: 1 }}
								className="ak-navbar__active-indicator"
								initial={motionPreset === "none" ? false : { scaleX: 0 }}
								transition={
									motionPreset === "none"
										? { duration: 0 }
										: getMotionTransition(motionPreset, "dropdown")
								}
							/>
						) : null}
					</motion.a>
				</NavigationMenu.Link>
			</motion.li>
		</NavigationMenu.Item>
	);
}

function DesktopDropdown({
	item,
	activeHref,
	motionPreset,
	onNavigate,
}: {
	item: NavbarDropdownItem;
	activeHref?: string;
	motionPreset: NavbarMotion;
	onNavigate?: NavigateHandler;
}) {
	const containsCurrentLink = item.items.some((link) =>
		isCurrentLink(link, activeHref),
	);
	const itemTransition =
		motionPreset === "none"
			? { duration: 0 }
			: getMotionTransition(motionPreset, "navigation");

	return (
		<NavigationMenu.Item asChild>
			<motion.li
				className="ak-navbar__item"
				layout={motionPreset === "none" ? false : "position"}
				transition={itemTransition}
			>
				<NavigationMenu.Trigger asChild>
					<motion.button
						className="ak-navbar__trigger ak-navbar__focus"
						data-active={containsCurrentLink || undefined}
						transition={itemTransition}
						type="button"
						whileHover={motionPreset === "none" ? undefined : { y: -2 }}
						whileTap={motionPreset === "none" ? undefined : { scale: 0.97 }}
					>
						{item.label}
						<ChevronIcon />
					</motion.button>
				</NavigationMenu.Trigger>
				<NavigationMenu.Content className="ak-navbar__dropdown-content">
					<motion.ul
						animate={{ opacity: 1, scale: 1, y: 0 }}
						className="ak-navbar__dropdown-list"
						initial={
							motionPreset === "none"
								? false
								: { opacity: 0, scale: 0.97, y: -8 }
						}
						transition={
							motionPreset === "none"
								? { duration: 0 }
								: getMotionTransition(motionPreset, "dropdown")
						}
					>
						{item.items.map((link) => {
							const isCurrent = isCurrentLink(link, activeHref);

							return (
								<li key={`${link.label}-${link.href}`}>
									<NavigationMenu.Link asChild active={isCurrent}>
										<motion.a
											aria-current={isCurrent ? "page" : undefined}
											className="ak-navbar__dropdown-link ak-navbar__focus"
											href={link.href}
											onClick={(event) => onNavigate?.(link, event)}
											transition={
												motionPreset === "none"
													? { duration: 0 }
													: getMotionTransition(motionPreset, "navigation")
											}
											whileHover={
												motionPreset === "none" ? undefined : { x: 3 }
											}
											whileTap={
												motionPreset === "none" ? undefined : { scale: 0.985 }
											}
											{...linkTargetProps(link.external)}
										>
											<span>{link.label}</span>
											{link.description ? (
												<small>{link.description}</small>
											) : null}
										</motion.a>
									</NavigationMenu.Link>
								</li>
							);
						})}
					</motion.ul>
				</NavigationMenu.Content>
			</motion.li>
		</NavigationMenu.Item>
	);
}

function DesktopNavigation({
	items,
	activeHref,
	motionPreset,
	showActiveIndicator,
	ariaLabel,
	dropdownDelay,
	onNavigate,
	alignment,
	hidden,
}: {
	items: readonly NavbarItem[];
	activeHref?: string;
	motionPreset: NavbarMotion;
	showActiveIndicator: boolean;
	ariaLabel: string;
	dropdownDelay: number;
	onNavigate?: NavigateHandler;
	alignment: "left" | "center" | "right";
	hidden: boolean;
}) {
	const navigationTransition =
		motionPreset === "none"
			? { duration: 0 }
			: getMotionTransition(motionPreset, "navigation");

	return (
		<motion.div
			className="ak-navbar__desktop-nav"
			layout={motionPreset === "none" ? false : "position"}
			style={{
				display: hidden ? "none" : undefined,
				justifySelf: alignment,
			}}
			transition={navigationTransition}
		>
			<NavigationMenu.Root
				aria-label={ariaLabel}
				className="ak-navbar__desktop-menu"
				delayDuration={dropdownDelay}
			>
				<NavigationMenu.List className="ak-navbar__list">
					{items.map((item) =>
						item.type === "dropdown" ? (
							<DesktopDropdown
								activeHref={activeHref}
								item={item}
								key={item.label}
								motionPreset={motionPreset}
								onNavigate={onNavigate}
							/>
						) : (
							<DesktopLink
								activeHref={activeHref}
								item={item}
								key={`${item.label}-${item.href}`}
								motionPreset={motionPreset}
								onNavigate={onNavigate}
								showActiveIndicator={showActiveIndicator}
							/>
						),
					)}
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</motion.div>
	);
}

function MobileLink({
	item,
	activeHref,
	onClose,
	onNavigate,
	className,
}: {
	item: NavbarLinkItem;
	activeHref?: string;
	onClose: () => void;
	onNavigate?: NavigateHandler;
	className: string;
}) {
	const isCurrent = isCurrentLink(item, activeHref);

	return (
		<a
			aria-current={isCurrent ? "page" : undefined}
			className={`${className} ak-navbar__focus`}
			href={item.href}
			onClick={(event) => {
				onNavigate?.(item, event);
				onClose();
			}}
			{...linkTargetProps(item.external)}
		>
			<span>{item.label}</span>
			{item.description ? <small>{item.description}</small> : null}
		</a>
	);
}

function MobileItems({
	items,
	activeHref,
	onClose,
	onNavigate,
	motionPreset,
}: {
	items: readonly NavbarItem[];
	activeHref?: string;
	onClose: () => void;
	onNavigate?: NavigateHandler;
	motionPreset: NavbarMotion;
}) {
	return (
		<motion.ul
			animate={{ opacity: 1, y: 0 }}
			className="ak-navbar__mobile-list"
			initial={motionPreset === "none" ? false : { opacity: 0, y: 12 }}
			transition={
				motionPreset === "none"
					? { duration: 0 }
					: { ...getMotionTransition(motionPreset, "drawer"), delay: 0.06 }
			}
		>
			{items.map((item) =>
				item.type === "dropdown" ? (
					<li key={item.label}>
						<details className="ak-navbar__mobile-group">
							<summary className="ak-navbar__mobile-summary ak-navbar__focus">
								{item.label}
								<ChevronIcon />
							</summary>
							<ul>
								{item.items.map((link) => (
									<li key={`${link.label}-${link.href}`}>
										<MobileLink
											activeHref={activeHref}
											className="ak-navbar__mobile-sublink"
											item={link}
											onClose={onClose}
											onNavigate={onNavigate}
										/>
									</li>
								))}
							</ul>
						</details>
					</li>
				) : (
					<li key={`${item.label}-${item.href}`}>
						<MobileLink
							activeHref={activeHref}
							className="ak-navbar__mobile-link"
							item={item}
							onClose={onClose}
							onNavigate={onNavigate}
						/>
					</li>
				),
			)}
		</motion.ul>
	);
}

export function Navbar({
	brand,
	items,
	activeHref,
	alignment = "right",
	action,
	sticky = false,
	variant = "default",
	motion: requestedMotion = "smooth",
	showActiveIndicator = true,
	mobileMenu = true,
	collapseAt = "md",
	displayMode = "responsive",
	dropdownDelay = 100,
	onNavigate,
	ariaLabel = "Main navigation",
	mobileMenuLabel = "Open navigation menu",
	className,
}: NavbarProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const prefersReducedMotion = useReducedMotion();
	const motionPreset = prefersReducedMotion ? "none" : requestedMotion;
	const isForcedMobile = displayMode === "mobile" && mobileMenu;
	const drawerTransition =
		motionPreset === "none"
			? { duration: 0 }
			: getMotionTransition(motionPreset, "drawer");

	return (
		<Dialog.Root onOpenChange={setMobileOpen} open={mobileOpen}>
			<header
				className={joinClassNames("ak-navbar", className)}
				data-alignment={alignment}
				data-collapse-at={collapseAt}
				data-display-mode={displayMode}
				data-mobile-menu={mobileMenu}
				data-motion={motionPreset}
				data-sticky={sticky}
				data-variant={variant}
			>
				<div className="ak-navbar__inner">
					<Brand brand={brand} motionPreset={motionPreset} />
					<DesktopNavigation
						activeHref={activeHref}
						alignment={alignment}
						ariaLabel={ariaLabel}
						dropdownDelay={dropdownDelay}
						items={items}
						hidden={isForcedMobile}
						motionPreset={motionPreset}
						onNavigate={onNavigate}
						showActiveIndicator={showActiveIndicator}
					/>
					{action ? (
						<div
							className="ak-navbar__action"
							style={{ display: isForcedMobile ? "none" : undefined }}
						>
							{action}
						</div>
					) : null}
					{mobileMenu ? (
						<Dialog.Trigger asChild>
							<motion.button
								aria-label={mobileMenuLabel}
								className="ak-navbar__menu-button ak-navbar__focus"
								style={{ display: isForcedMobile ? "inline-flex" : undefined }}
								transition={drawerTransition}
								type="button"
								whileHover={
									motionPreset === "none" ? undefined : { scale: 1.04 }
								}
								whileTap={motionPreset === "none" ? undefined : { scale: 0.94 }}
							>
								<MenuIcon />
							</motion.button>
						</Dialog.Trigger>
					) : null}
				</div>
			</header>

			<AnimatePresence>
				{mobileMenu && mobileOpen ? (
					<Dialog.Portal forceMount>
						<Dialog.Overlay asChild>
							<motion.div
								animate={{ opacity: 1 }}
								className="ak-navbar__overlay"
								exit={{ opacity: 0 }}
								initial={motionPreset === "none" ? false : { opacity: 0 }}
								transition={drawerTransition}
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild aria-describedby={undefined}>
							<motion.div
								animate={{ x: 0 }}
								className="ak-navbar__mobile-panel"
								exit={{ x: "100%" }}
								initial={motionPreset === "none" ? false : { x: "100%" }}
								transition={drawerTransition}
							>
								<div className="ak-navbar__mobile-header">
									<Dialog.Title className="ak-navbar__mobile-title">
										Navigation
									</Dialog.Title>
									<Dialog.Close asChild>
										<button
											aria-label="Close navigation menu"
											className="ak-navbar__close-button ak-navbar__focus"
											type="button"
										>
											<CloseIcon />
										</button>
									</Dialog.Close>
								</div>
								<nav aria-label={ariaLabel}>
									<MobileItems
										activeHref={activeHref}
										items={items}
										motionPreset={motionPreset}
										onClose={() => setMobileOpen(false)}
										onNavigate={onNavigate}
									/>
								</nav>
								{action ? (
									<div className="ak-navbar__mobile-action">{action}</div>
								) : null}
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}
