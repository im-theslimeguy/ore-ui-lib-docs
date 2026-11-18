import React from "react";

export type OreProgressBarColor =
	| "blue"
	| "turquoise"
	| "green"
	| "red"
	| "pink"
	| "yellow"
	| "orange"
	| "purple"
	| "gray"
	| "dark-gray";

export type OreProgressBarTone = "vibrant" | "pastel";

export type OreProgressBarSize = "sm" | "md" | "lg";

export interface OreProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
	max?: number;
	color?: OreProgressBarColor;
	tone?: OreProgressBarTone;
	size?: OreProgressBarSize;
}

export function OreProgressBar({
	value,
	max = 100,
	color = "blue",
	tone = "vibrant",
	size = "md",
	className,
	...rest
}: OreProgressBarProps) {
	const safeMax = max <= 0 ? 100 : max;
	const pct = Math.max(0, Math.min(100, (value / safeMax) * 100));

	const classes = [
		"ore-progress",
		`ore-progress--${tone}`,
		`ore-progress--${color}`,
		`ore-progress--${size}`,
		className ?? "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={safeMax}
			className={classes}
			{...rest}
		>
			<div className="ore-progress__inner">
				<div className="ore-progress__track" />
				{pct > 0 && <div className="ore-progress__fill" style={{ width: `${pct}%` }} />}
			</div>
		</div>
	);
}
