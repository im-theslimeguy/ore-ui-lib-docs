import React from "react";

export type OreSeamlessButtonTheme = "light" | "dark";
export type OreSeamlessButtonSize = "sm" | "md" | "lg";
export type OreSeamlessButtonState = "default" | "hover" | "focus";

export interface OreSeamlessButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: OreSeamlessButtonTheme;
	size?: OreSeamlessButtonSize;
	icon?: React.ReactNode;
	forceState?: OreSeamlessButtonState;
}

export const OreSeamlessButton = React.forwardRef<HTMLButtonElement, OreSeamlessButtonProps>(
	(
		{
			theme = "light",
			size = "md",
			icon,
			forceState,
			type = "button",
			className,
			children,
			...rest
		},
		ref
	) => {
		const hasLabel = children !== undefined && children !== null && children !== "";
		const isIconOnly = Boolean(icon) && !hasLabel;

		const classes = [
			"ore-seamless-btn",
			`ore-seamless-btn--${theme}`,
			`ore-seamless-btn--${size}`,
			isIconOnly ? "ore-seamless-btn--icon-only" : "",
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
				<span className="ore-seamless-btn__content">
					{icon && (
						<span className="ore-seamless-btn__icon" aria-hidden="true">
							{icon}
						</span>
					)}
					{hasLabel && <span className="ore-seamless-btn__label">{children}</span>}
				</span>
			</button>
		);
	}
);

OreSeamlessButton.displayName = "OreSeamlessButton";
