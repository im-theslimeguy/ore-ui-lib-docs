import React from "react";

export type OreButtonColor = "colored" | "general" | "warning" | "realms" | "destructive";

export type OreButtonState =
	| "default"
	| "hover"
	| "focus"
	| "focus-hover"
	| "pressed"
	| "pressed-hover"
	| "subtly-disabled"
	| "disabled";

export type OreButtonOrientation = "horizontal" | "vertical";

export type OreButtonSize = "sm" | "md" | "lg";

export interface OreButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
	/** Visual color variant matching the Figma Ore UI Style sheet. */
	color?: OreButtonColor;
	/** Optional leading/top icon node (sized to 32px * --ore-scale). */
	icon?: React.ReactNode;
	/** Layout orientation when both icon and label are present. */
	orientation?: OreButtonOrientation;
	/** Component scale preset: `sm` (0.375x), `md` (0.5x, default), `lg` (1x Figma 1:1). */
	size?: OreButtonSize;
	/** Renders the sunken, 50%-opacity subtly disabled state while keeping the button focusable/accessible via aria-disabled. */
	subtlyDisabled?: boolean;
	/** Stretch to 100% of container width. */
	fullWidth?: boolean;
	/** Force a specific visual state (useful for documentation galleries and visual regression). */
	forceState?: OreButtonState;
}

export const OreButton = React.forwardRef<HTMLButtonElement, OreButtonProps>(
	(
		{
			color = "colored",
			icon,
			orientation = "horizontal",
			size = "md",
			subtlyDisabled = false,
			fullWidth = false,
			forceState,
			disabled = false,
			type = "button",
			className,
			children,
			onClick,
			...rest
		},
		ref
	) => {
		const hasLabel = children !== undefined && children !== null && children !== "";
		const isIconOnly = Boolean(icon) && !hasLabel;
		const isPhysicallyDisabled = disabled || forceState === "disabled";
		const isSubtlyDisabled = !isPhysicallyDisabled && (subtlyDisabled || forceState === "subtly-disabled");

		const classes = [
			"ore-btn",
			`ore-btn--${color}`,
			`ore-btn--${size}`,
			orientation === "vertical" ? "ore-btn--vertical" : "ore-btn--horizontal",
			isIconOnly ? "ore-btn--icon-only" : "",
			fullWidth ? "ore-btn--full-width" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (isPhysicallyDisabled || isSubtlyDisabled) {
				event.preventDefault();
				return;
			}
			onClick?.(event);
		};

		return (
			<button
				ref={ref}
				type={type}
				className={classes}
				disabled={isPhysicallyDisabled}
				aria-disabled={isSubtlyDisabled || isPhysicallyDisabled ? true : undefined}
				data-subtly-disabled={isSubtlyDisabled ? "true" : undefined}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={handleClick}
				{...rest}
			>
				<span className="ore-btn__container">
					<span className="ore-btn__background">
						<span className="ore-btn__content">
							{icon && (
								<span className="ore-btn__icon" aria-hidden="true">
									{icon}
								</span>
							)}
							{hasLabel && <span className="ore-btn__label">{children}</span>}
						</span>
					</span>
					<span className="ore-btn__shadow" aria-hidden="true" />
				</span>
			</button>
		);
	}
);

OreButton.displayName = "OreButton";
