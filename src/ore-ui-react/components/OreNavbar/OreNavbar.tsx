import React from "react";

export type OreNavbarSize = "sm" | "md" | "lg";

export type OreNavItemType = "item" | "header";

export type OreNavItemState = "default" | "selected" | "focus" | "selected-focus";

export interface OreNavbarProps extends React.HTMLAttributes<HTMLElement> {
	size?: OreNavbarSize;
	children: React.ReactNode;
}

export function OreNavbar({ size = "md", className, children, ...rest }: OreNavbarProps) {
	const classes = ["ore-navbar", `ore-navbar--${size}`, className ?? ""].filter(Boolean).join(" ");
	return (
		<nav className={classes} {...rest}>
			<div className="ore-navbar__groups">{children}</div>
		</nav>
	);
}

export interface OreNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function OreNavGroup({ className, children, ...rest }: OreNavGroupProps) {
	const classes = ["ore-navbar__group", className ?? ""].filter(Boolean).join(" ");
	return (
		<div className={classes} role="group" {...rest}>
			{children}
		</div>
	);
}

export interface OreNavItemProps {
	/** `"item"` renders a clickable button; `"header"` renders a non-clickable, Tab-focusable section header. */
	type?: OreNavItemType;
	selected?: boolean;
	icon?: React.ReactNode;
	badge?: React.ReactNode;
	forceState?: OreNavItemState;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	children: React.ReactNode;
	"aria-label"?: string;
}

export const OreNavItem = React.forwardRef<HTMLElement, OreNavItemProps>(
	(
		{
			type = "item",
			selected = false,
			icon,
			badge,
			forceState,
			onClick,
			className,
			children,
			"aria-label": ariaLabel,
		},
		ref
	) => {
		const isSelected = selected || forceState === "selected" || forceState === "selected-focus";
		const classes = [
			"ore-nav-item",
			type === "header" ? "ore-nav-item--header" : "ore-nav-item--item",
			isSelected ? "ore-nav-item--selected" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		const content = (
			<span className="ore-nav-item__bg">
				<span className="ore-nav-item__content">
					<span className="ore-nav-item__leading">
						{icon && (
							<span className="ore-nav-item__icon" aria-hidden="true">
								{icon}
							</span>
						)}
						<span className="ore-nav-item__label">{children}</span>
					</span>
					{badge !== undefined && badge !== null && <span className="ore-nav-item__badge">{badge}</span>}
				</span>
			</span>
		);

		if (type === "header") {
			return (
				<div
					ref={ref as React.Ref<HTMLDivElement>}
					tabIndex={0}
					role="heading"
					aria-level={3}
					aria-label={ariaLabel}
					className={classes}
					data-state={forceState && forceState !== "default" ? forceState : undefined}
				>
					{content}
				</div>
			);
		}

		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				type="button"
				aria-current={isSelected ? "page" : undefined}
				aria-label={ariaLabel}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={onClick}
			>
				{content}
			</button>
		);
	}
);

OreNavItem.displayName = "OreNavItem";
