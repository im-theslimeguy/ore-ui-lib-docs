import React from "react";
import type { OreProgressBarColor, OreProgressBarTone } from "../OreProgressBar/OreProgressBar";

export type OreMessageSize = "sm" | "md" | "lg";

export interface OreMessageProps extends React.HTMLAttributes<HTMLDivElement> {
	color?: OreProgressBarColor;
	tone?: OreProgressBarTone;
	size?: OreMessageSize;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	children: React.ReactNode;
}

export function OreMessage({
	color = "blue",
	tone = "vibrant",
	size = "md",
	leadingIcon,
	trailingIcon,
	className,
	children,
	...rest
}: OreMessageProps) {
	const classes = [
		"ore-message",
		`ore-message--${tone}`,
		`ore-message--${color}`,
		`ore-message--${size}`,
		className ?? "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes} {...rest}>
			<div className="ore-message__leading">
				{leadingIcon && (
					<span className="ore-message__icon ore-message__icon--leading" aria-hidden="true">
						{leadingIcon}
					</span>
				)}
				<span className="ore-message__text">{children}</span>
			</div>
			{trailingIcon && (
				<span className="ore-message__icon ore-message__icon--trailing" aria-hidden="true">
					{trailingIcon}
				</span>
			)}
		</div>
	);
}
