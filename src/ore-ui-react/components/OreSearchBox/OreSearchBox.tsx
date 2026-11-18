import React from "react";
import type { OreTextboxSize, OreTextboxState } from "../OreTextbox/OreTextbox";

export interface OreSearchBoxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: OreTextboxSize;
	invalid?: boolean;
	forceState?: OreTextboxState;
	onClear?: () => void;
}

function PixelSearchIcon() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M3 1H7V2H8V3H9V7H8V8H7V9H3V8H2V7H1V3H2V2H3V1ZM3 3V7H7V3H3ZM8 8H9V9H10V10H11V11H9V10H8V9H8V8Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function PixelCloseIcon() {
	return (
		<svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M1 1H3V3H4V4H6V3H7V1H9V3H7V4H6V6H7V7H9V9H7V7H6V6H4V7H3V9H1V7H3V6H4V4H3V3H1V1Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const OreSearchBox = React.forwardRef<HTMLInputElement, OreSearchBoxProps>(
	(
		{
			size = "md",
			invalid = false,
			forceState,
			disabled = false,
			value,
			onClear,
			className,
			placeholder = "Search...",
			...rest
		},
		ref
	) => {
		const isDisabled = disabled || forceState === "disabled";
		const hasValue = typeof value === "string" ? value.length > 0 : false;
		const classes = [
			"ore-textbox",
			"ore-textbox--search",
			`ore-textbox--${size}`,
			invalid ? "ore-textbox--invalid" : "",
			isDisabled ? "ore-textbox--disabled" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
			>
				<div className="ore-textbox__content">
					<span className="ore-textbox__leading" aria-hidden="true">
						<PixelSearchIcon />
					</span>
					<input
						ref={ref}
						type="search"
						value={value}
						placeholder={placeholder}
						disabled={isDisabled}
						aria-invalid={invalid || undefined}
						className="ore-textbox__input"
						{...rest}
					/>
					{hasValue && onClear && !isDisabled && (
						<button
							type="button"
							onClick={onClear}
							aria-label="Clear search"
							className="ore-textbox__trailing ore-textbox__trailing--btn"
						>
							<PixelCloseIcon />
						</button>
					)}
				</div>
			</div>
		);
	}
);

OreSearchBox.displayName = "OreSearchBox";
