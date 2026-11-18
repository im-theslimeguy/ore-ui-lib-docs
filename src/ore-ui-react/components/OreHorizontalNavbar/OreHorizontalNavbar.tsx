import React, { createContext, useContext } from "react";

export type OreHorizontalNavSize = "sm" | "md" | "lg";

interface HorizontalNavContextValue {
	value: string;
	onChange: (value: string) => void;
	size: OreHorizontalNavSize;
}

const HorizontalNavContext = createContext<HorizontalNavContextValue | null>(null);

export interface OreHorizontalNavGroupProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	size?: OreHorizontalNavSize;
	children: React.ReactNode;
}

export function OreHorizontalNavGroup({
	value,
	onChange,
	size = "md",
	className,
	children,
	...rest
}: OreHorizontalNavGroupProps) {
	const classes = ["ore-hnav-group", `ore-hnav-group--${size}`, className ?? ""]
		.filter(Boolean)
		.join(" ");

	return (
		<HorizontalNavContext.Provider value={{ value, onChange, size }}>
			<nav role="tablist" className={classes} {...rest}>
				{children}
			</nav>
		</HorizontalNavContext.Provider>
	);
}

export interface OreHorizontalNavItemProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
	value: string;
	icon?: React.ReactNode;
	badge?: React.ReactNode;
	children: React.ReactNode;
}

export const OreHorizontalNavItem = React.forwardRef<HTMLButtonElement, OreHorizontalNavItemProps>(
	({ value, icon, badge, disabled = false, className, children, onClick, ...rest }, ref) => {
		const ctx = useContext(HorizontalNavContext);
		if (!ctx) {
			throw new Error("OreHorizontalNavItem must be used inside <OreHorizontalNavGroup>.");
		}

		const isSelected = ctx.value === value;
		const classes = [
			"ore-hnav-item",
			isSelected ? "ore-hnav-item--selected" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type="button"
				role="tab"
				aria-selected={isSelected}
				disabled={disabled}
				className={classes}
				onClick={(e) => {
					if (disabled) {
						e.preventDefault();
						return;
					}
					ctx.onChange(value);
					onClick?.(e);
				}}
				{...rest}
			>
				<span className="ore-hnav-item__container">
					<span className="ore-hnav-item__face">
						<span className="ore-hnav-item__content">
							{icon && (
								<span className="ore-hnav-item__icon" aria-hidden="true">
									{icon}
								</span>
							)}
							<span className="ore-hnav-item__label">{children}</span>
							{badge !== undefined && badge !== null && (
								<span className="ore-hnav-item__badge">{badge}</span>
							)}
						</span>
					</span>
					<span className="ore-hnav-item__shadow" aria-hidden="true" />
				</span>
				<span className="ore-hnav-item__line" aria-hidden="true" />
			</button>
		);
	}
);

OreHorizontalNavItem.displayName = "OreHorizontalNavItem";
