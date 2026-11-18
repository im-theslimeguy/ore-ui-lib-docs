import React from "react";
import type { OrePastelColor } from "../OreTag/OreTag";

export type OreLabeledDividerSize = "sm" | "md" | "lg";

export interface OreLabeledDividerProps extends React.HTMLAttributes<HTMLDivElement> {
	color?: OrePastelColor;
	size?: OreLabeledDividerSize;
	children: React.ReactNode;
}

export function OreLabeledDivider({
	color = "gray",
	size = "md",
	className,
	children,
	...rest
}: OreLabeledDividerProps) {
	const classes = ["ore-divider", `ore-divider--${color}`, `ore-divider--${size}`, className ?? ""]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes} role="separator" {...rest}>
			<span className="ore-divider__label">{children}</span>
			<span className="ore-divider__tail" aria-hidden="true" />
		</div>
	);
}
