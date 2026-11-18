import React from "react";

export type OreMenuButtonSize = "sm" | "md" | "lg";
export type OreMenuButtonState = "default" | "hover" | "focus";

export interface OreMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: OreMenuButtonSize;
	icon?: React.ReactNode;
	forceState?: OreMenuButtonState;
}

export const OreMenuButton = React.forwardRef<HTMLButtonElement, OreMenuButtonProps>(
	(
		{
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
		const classes = ["ore-menu-btn", `ore-menu-btn--${size}`, className ?? ""]
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
				<span className="ore-menu-btn__content">
					{icon && (
						<span className="ore-menu-btn__icon" aria-hidden="true">
							{icon}
						</span>
					)}
					<span className="ore-menu-btn__label">{children}</span>
				</span>
			</button>
		);
	}
);

OreMenuButton.displayName = "OreMenuButton";

export function OreMenuGroup({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={["ore-menu-group", className ?? ""].filter(Boolean).join(" ")} {...rest}>
			{children}
		</div>
	);
}
