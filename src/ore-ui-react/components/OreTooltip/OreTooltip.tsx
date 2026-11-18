import React, { useLayoutEffect, useRef, useState } from "react";

export type OreTooltipSize = "sm" | "md" | "lg";

export interface OreTooltipProps {
	content: React.ReactNode;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	size?: OreTooltipSize;
	children: React.ReactNode;
}

export function OreTooltip({
	content,
	leadingIcon,
	trailingIcon,
	size = "md",
	children,
}: OreTooltipProps) {
	const [visible, setVisible] = useState(false);
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [placement, setPlacement] = useState<{
		left: number;
		top: number;
		tailPlacement: "bottom" | "top";
		tailSide: "left" | "right";
	}>({ left: 0, top: 0, tailPlacement: "bottom", tailSide: "left" });

	const tipRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!visible || !tipRef.current) return;
		const rect = tipRef.current.getBoundingClientRect();
		const margin = 10;
		const offset = 14;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// Prefer showing above cursor (tail at bottom); flip below (tail at top) if not enough room above.
		let tailPlacement: "bottom" | "top" = "bottom";
		let top = cursor.y - rect.height - offset;
		if (top < margin) {
			tailPlacement = "top";
			top = Math.min(vh - rect.height - margin, cursor.y + offset);
		}

		// Prefer aligning tail on the left near cursor; flip tail to right if overflowing right edge.
		let tailSide: "left" | "right" = "left";
		let left = cursor.x - 14;
		if (left + rect.width > vw - margin) {
			tailSide = "right";
			left = Math.max(margin, cursor.x - rect.width + 14);
		} else if (left < margin) {
			left = margin;
		}

		setPlacement({ left, top, tailPlacement, tailSide });
	}, [visible, cursor, content]);

	const tailEl = (
		<div
			className={`ore-tooltip__tail-row ore-tooltip__tail-row--${placement.tailPlacement} ore-tooltip__tail-row--${placement.tailSide}`}
			aria-hidden="true"
		>
			<div className={`ore-tooltip__tail ore-tooltip__tail--${placement.tailPlacement}-${placement.tailSide}`}>
				<span className="ore-tooltip__tail-step1" />
				<span className="ore-tooltip__tail-step2" />
				<span className="ore-tooltip__tail-step3" />
			</div>
		</div>
	);

	return (
		<>
			<span
				className="ore-tooltip-trigger"
				onMouseEnter={(e) => {
					setCursor({ x: e.clientX, y: e.clientY });
					setVisible(true);
				}}
				onMouseMove={(e) => {
					setCursor({ x: e.clientX, y: e.clientY });
				}}
				onMouseLeave={() => setVisible(false)}
			>
				{children}
			</span>

			{visible && (
				<div
					ref={tipRef}
					role="tooltip"
					className={`ore-tooltip ore-tooltip--${size}`}
					style={{ left: placement.left, top: placement.top }}
				>
					{placement.tailPlacement === "top" && tailEl}
					<div className="ore-tooltip__bubble">
						<div className="ore-tooltip__popout-left" aria-hidden="true">
							<div className="ore-tooltip__popout-left-fill" />
						</div>
						<div className="ore-tooltip__corners" aria-hidden="true">
							<span className="ore-tooltip__corner ore-tooltip__corner--tl" />
							<span className="ore-tooltip__corner ore-tooltip__corner--bl" />
						</div>
						<div className="ore-tooltip__body">
							<div className="ore-tooltip__leading">
								{leadingIcon && (
									<span className="ore-tooltip__icon" aria-hidden="true">
										{leadingIcon}
									</span>
								)}
								<span className="ore-tooltip__text">{content}</span>
							</div>
							{trailingIcon && (
								<span className="ore-tooltip__icon ore-tooltip__icon--trailing" aria-hidden="true">
									{trailingIcon}
								</span>
							)}
						</div>
						<div className="ore-tooltip__corners" aria-hidden="true">
							<span className="ore-tooltip__corner ore-tooltip__corner--tr" />
							<span className="ore-tooltip__corner ore-tooltip__corner--br" />
						</div>
						<div className="ore-tooltip__popout-right" aria-hidden="true">
							<div className="ore-tooltip__popout-right-fill" />
						</div>
					</div>
					{placement.tailPlacement === "bottom" && tailEl}
				</div>
			)}
		</>
	);
}
