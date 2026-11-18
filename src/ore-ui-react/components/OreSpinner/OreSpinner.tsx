import React, { useEffect, useState } from "react";

export type OreSpinnerTheme = "light" | "dark";
export type OreSpinnerSize = "sm" | "md" | "lg";

/**
 * 16 perimeter coordinates (col, row) on a 7x7 grid, clockwise from top-left-ish (2,0).
 * Frames 1..16 each light up 4 consecutive cells; frame 0 (full circle) is excluded.
 */
const RING_CELLS: ReadonlyArray<readonly [number, number]> = [
	[2, 0],
	[3, 0],
	[4, 0],
	[5, 1],
	[6, 2],
	[6, 3],
	[6, 4],
	[5, 5],
	[4, 6],
	[3, 6],
	[2, 6],
	[1, 5],
	[0, 4],
	[0, 3],
	[0, 2],
	[1, 1],
];

export interface OreSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
	theme?: OreSpinnerTheme;
	size?: OreSpinnerSize;
	/** Optional fixed frame (1..16). When omitted, animates continuously through frames 1..16. */
	step?: number;
	/** Frame duration in ms when animating (default 75ms). */
	intervalMs?: number;
}

export function OreSpinner({
	theme = "light",
	size = "md",
	step,
	intervalMs = 75,
	className,
	...rest
}: OreSpinnerProps) {
	const [frame, setFrame] = useState<number>(1);

	useEffect(() => {
		if (step !== undefined) return;
		const id = window.setInterval(() => {
			setFrame((prev) => (prev >= 16 ? 1 : prev + 1));
		}, intervalMs);
		return () => window.clearInterval(id);
	}, [step, intervalMs]);

	const activeStep = step !== undefined ? Math.max(1, Math.min(16, Math.round(step))) : frame;
	const startIdx = (activeStep + 2) % 16;
	const litCells = [0, 1, 2, 3].map((offset) => RING_CELLS[(startIdx + offset) % 16]);

	const classes = ["ore-spinner", `ore-spinner--${theme}`, `ore-spinner--${size}`, className ?? ""]
		.filter(Boolean)
		.join(" ");

	return (
		<div role="status" aria-label="Loading" className={classes} {...rest}>
			{litCells.map(([col, row], idx) => (
				<span
					key={idx}
					className="ore-spinner__cell"
					style={{ gridColumn: col + 1, gridRow: row + 1 }}
					aria-hidden="true"
				/>
			))}
		</div>
	);
}
