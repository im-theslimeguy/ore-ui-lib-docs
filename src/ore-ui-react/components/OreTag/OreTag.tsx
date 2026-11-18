import React from "react";

export type OrePastelColor =
	| "gray"
	| "dark-gray"
	| "red"
	| "pink"
	| "purple"
	| "blue"
	| "turquoise"
	| "green"
	| "yellow"
	| "orange";

export type OreTagSize = "sm" | "md" | "lg";

export interface OreTagProps extends React.HTMLAttributes<HTMLSpanElement> {
	color?: OrePastelColor;
	size?: OreTagSize;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	children: React.ReactNode;
}

export function OreTag({
	color = "gray",
	size = "md",
	leadingIcon,
	trailingIcon,
	className,
	children,
	...rest
}: OreTagProps) {
	const classes = ["ore-tag", `ore-tag--${color}`, `ore-tag--${size}`, className ?? ""]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={classes} {...rest}>
			{leadingIcon && (
				<span className="ore-tag__icon" aria-hidden="true">
					{leadingIcon}
				</span>
			)}
			<span>{children}</span>
			{trailingIcon && (
				<span className="ore-tag__icon" aria-hidden="true">
					{trailingIcon}
				</span>
			)}
		</span>
	);
}
