import React, { useRef, useState } from "react";

export type OreSliderColor = "colored" | "general" | "destructive" | "warning" | "realms";
export type OreSliderSize = "sm" | "md" | "lg";

export interface OreSliderProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "onChange"> {
	value: number;
	min?: number;
	max?: number;
	/** When provided (>= 2), enables segmented mode with `segments` snap points and spring pull on release. */
	segments?: number;
	onChange?: (value: number) => void;
	color?: OreSliderColor;
	size?: OreSliderSize;
	disabled?: boolean;
}

export function OreSlider({
	value,
	min = 0,
	max = 100,
	segments,
	onChange,
	color = "colored",
	size = "md",
	disabled = false,
	className,
	onKeyDown,
	...rest
}: OreSliderProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const pointerStateRef = useRef<{
		active: boolean;
		startX: number;
		moved: boolean;
	}>({ active: false, startX: 0, moved: false });
	const [pressed, setPressed] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [dragPct, setDragPct] = useState<number | null>(null);

	const range = max - min <= 0 ? 100 : max - min;
	const isSegmented = segments !== undefined && segments >= 2;
	const segmentCount = isSegmented ? Math.round(segments) : 0;
	const segmentIntervals = Math.max(1, segmentCount - 1);

	const committedPct = Math.max(0, Math.min(1, (value - min) / range));
	const visualPct = dragging && dragPct !== null ? dragPct : committedPct;

	const pctFromPointer = (clientX: number): number => {
		const el = trackRef.current;
		if (!el) return committedPct;
		const rect = el.getBoundingClientRect();
		if (rect.width <= 0) return committedPct;
		return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
	};

	const commitPct = (pct: number) => {
		if (!onChange) return;
		if (isSegmented) {
			const nearestIdx = Math.round(pct * segmentIntervals);
			const snappedPct = nearestIdx / segmentIntervals;
			onChange(min + snappedPct * range);
		} else {
			onChange(min + pct * range);
		}
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (disabled) return;
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		setPressed(true);
		const pct = pctFromPointer(e.clientX);

		if (isSegmented) {
			const nearestIdx = Math.round(pct * segmentIntervals);
			const currentIdx = Math.round(committedPct * segmentIntervals);
			pointerStateRef.current = {
				active: true,
				startX: e.clientX,
				moved: false,
			};
			if (nearestIdx !== currentIdx) {
				commitPct(pct);
			}
			return;
		}

		pointerStateRef.current = {
			active: true,
			startX: e.clientX,
			moved: true,
		};
		setDragging(true);
		setDragPct(pct);
		commitPct(pct);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (disabled || !pointerStateRef.current.active) return;
		if (!pointerStateRef.current.moved) {
			if (Math.abs(e.clientX - pointerStateRef.current.startX) <= 4) {
				return;
			}
			pointerStateRef.current.moved = true;
			setDragging(true);
		}
		const pct = pctFromPointer(e.clientX);
		setDragPct(pct);
		if (!isSegmented) {
			commitPct(pct);
		}
	};

	const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!pointerStateRef.current.active) return;
		const wasMoved = pointerStateRef.current.moved;
		pointerStateRef.current.active = false;
		pointerStateRef.current.moved = false;
		setPressed(false);

		if (wasMoved) {
			const pct = pctFromPointer(e.clientX);
			setDragging(false);
			setDragPct(null);
			commitPct(pct);
		}

		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}
	};

	const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (disabled) return;
		let deltaPct = 0;
		if (e.key === "ArrowRight" || e.key === "ArrowUp") {
			deltaPct = isSegmented ? 1 / segmentIntervals : 0.05;
		} else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
			deltaPct = isSegmented ? -1 / segmentIntervals : -0.05;
		} else if (e.key === "Home") {
			e.preventDefault();
			onChange?.(min);
			return;
		} else if (e.key === "End") {
			e.preventDefault();
			onChange?.(max);
			return;
		}

		if (deltaPct !== 0) {
			e.preventDefault();
			const nextPct = Math.max(0, Math.min(1, committedPct + deltaPct));
			commitPct(nextPct);
		}
		onKeyDown?.(e);
	};

	const handleLeft = `calc(7.25 * var(--ore-px) + (100% - 14.5 * var(--ore-px)) * ${visualPct})`;
	const fillClipRight = `calc((100% - 14.5 * var(--ore-px)) * ${1 - visualPct} + 7.25 * var(--ore-px))`;
	const fillClipPath = `inset(0 ${fillClipRight} 0 0)`;

	const classes = [
		"ore-slider",
		`ore-slider--${color}`,
		`ore-slider--${size}`,
		pressed ? "ore-slider--pressed" : "",
		dragging ? "ore-slider--dragging" : "",
		disabled ? "ore-slider--disabled" : "",
		className ?? "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			ref={trackRef}
			role="slider"
			tabIndex={disabled ? -1 : 0}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			aria-disabled={disabled || undefined}
			className={classes}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			onKeyDown={handleKey}
			{...rest}
		>
			<div className="ore-slider__track" aria-hidden="true">
				{isSegmented ? (
					<>
						<div className="ore-slider__segments">
							{Array.from({ length: segmentIntervals }, (_, idx) => (
								<div key={idx} className="ore-slider__segment">
									<div className="ore-slider__empty-face">
										<div className="ore-slider__empty-light" />
									</div>
								</div>
							))}
						</div>
						<div
							className="ore-slider__fill-overlay"
							style={{ clipPath: fillClipPath }}
						>
							<div className="ore-slider__segments">
								{Array.from({ length: segmentIntervals }, (_, idx) => (
									<div key={idx} className="ore-slider__segment ore-slider__segment--active">
										<div className="ore-slider__fill-face">
											<div className="ore-slider__fill-light" />
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						<div className="ore-slider__part ore-slider__part--empty">
							<div className="ore-slider__empty-face">
								<div className="ore-slider__empty-light" />
							</div>
						</div>
						<div
							className="ore-slider__fill-overlay"
							style={{ clipPath: fillClipPath }}
						>
							<div className="ore-slider__part ore-slider__part--filled">
								<div className="ore-slider__fill-face">
									<div className="ore-slider__fill-light" />
								</div>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="ore-slider__handle" style={{ left: handleLeft }} aria-hidden="true">
				<div className="ore-slider__handle-face">
					<div className="ore-slider__handle-light" />
				</div>
				<span className="ore-slider__handle-shadow" />
			</div>
		</div>
	);
}
