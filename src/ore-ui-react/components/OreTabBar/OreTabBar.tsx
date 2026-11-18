import React from "react";

export type OreTabBarSize = "sm" | "md" | "lg";

export interface OreTabBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	size?: OreTabBarSize;
	forceState?: "default" | "hover" | "focus";
}

export const OreTabBarButton = React.forwardRef<HTMLButtonElement, OreTabBarButtonProps>(
	({ icon, size = "md", forceState, type = "button", className, children, ...rest }, ref) => {
		const hasText = children !== undefined && children !== null && children !== "";
		const classes = [
			"ore-tabbar-btn",
			`ore-tabbar-btn--${size}`,
			hasText ? "ore-tabbar-btn--has-text" : "ore-tabbar-btn--icon-only",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type={type}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				{...rest}
			>
				<span className="ore-tabbar-btn__face">
					<span className="ore-tabbar-btn__content">
						{icon && (
							<span className="ore-tabbar-btn__icon" aria-hidden="true">
								{icon}
							</span>
						)}
						{hasText && <span className="ore-tabbar-btn__label">{children}</span>}
					</span>
				</span>
				<span className="ore-tabbar-btn__shadow" aria-hidden="true" />
			</button>
		);
	}
);

OreTabBarButton.displayName = "OreTabBarButton";

export interface OreTabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
	title: React.ReactNode;
	leading?: React.ReactNode;
	trailing?: React.ReactNode;
	size?: OreTabBarSize;
}

export function OreTabBar({
	title,
	leading,
	trailing,
	size = "md",
	className,
	...rest
}: OreTabBarProps) {
	const classes = ["ore-tabbar", `ore-tabbar--${size}`, className ?? ""].filter(Boolean).join(" ");

	return (
		<header className={classes} {...rest}>
			{leading && <div className="ore-tabbar__side">{leading}</div>}
			<div className="ore-tabbar__center">
				<div className="ore-tabbar__face">
					<div className="ore-tabbar__title">{title}</div>
				</div>
				<span className="ore-tabbar__shadow" aria-hidden="true" />
			</div>
			{trailing && <div className="ore-tabbar__side">{trailing}</div>}
		</header>
	);
}
