import React from "react";

export type OreLoadingBarTheme = "light" | "dark";
export type OreLoadingBarSize = "sm" | "md" | "lg";

export interface OreLoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
	theme?: OreLoadingBarTheme;
	size?: OreLoadingBarSize;
	/** Optional determinate progress (0..100). When omitted, animates an indeterminate moving progress block inside the stationary frame. */
	value?: number;
}

export function OreLoadingBar({
	theme = "light",
	size = "md",
	value,
	className,
	...rest
}: OreLoadingBarProps) {
	const isDeterminate = value !== undefined;
	const pct = isDeterminate ? Math.max(0, Math.min(100, value)) : 0;

	const classes = [
		"ore-loading-bar",
		`ore-loading-bar--${theme}`,
		`ore-loading-bar--${size}`,
		className ?? "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			role="progressbar"
			aria-valuenow={isDeterminate ? pct : undefined}
			aria-valuemin={0}
			aria-valuemax={100}
			className={classes}
			{...rest}
		>
			<div className="ore-loading-bar__track">
				{isDeterminate ? (
					<div className="ore-loading-bar__fill" style={{ width: `${pct}%` }} />
				) : (
					<div className="ore-loading-bar__fill ore-loading-bar__fill--indeterminate" />
				)}
			</div>
		</div>
	);
}
