import React, { useId } from "react";

export type OreCheckboxColor = "colored" | "destructive" | "warning" | "realms";

export type OreCheckboxState = "default" | "hover" | "focus" | "focus-hover" | "disabled";

export type OreCheckboxSize = "sm" | "md" | "lg";

export interface OreCheckboxProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange"> {
	checked?: boolean | "indeterminate";
	onChange?: (checked: boolean) => void;
	color?: OreCheckboxColor;
	size?: OreCheckboxSize;
	forceState?: OreCheckboxState;
	label?: React.ReactNode;
}

function PixelCheckIcon() {
	return (
		<svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M6 1H7V2H6V1ZM5 2H6V3H5V2ZM0 3H1V4H0V3ZM4 3H5V4H4V3ZM1 4H2V5H1V4ZM3 4H4V5H3V4ZM2 5H3V6H2V5Z" fill="currentColor" />
		</svg>
	);
}

function PixelIndeterminateIcon() {
	return (
		<svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<rect x="1" y="3" width="5" height="1" fill="currentColor" />
		</svg>
	);
}

export const OreCheckbox = React.forwardRef<HTMLButtonElement, OreCheckboxProps>(
	(
		{
			checked = false,
			onChange,
			color = "colored",
			size = "md",
			forceState,
			disabled = false,
			label,
			className,
			id,
			onClick,
			...rest
		},
		ref
	) => {
		const generatedId = useId();
		const controlId = id ?? generatedId;
		const isIndeterminate = checked === "indeterminate";
		const isChecked = checked === true;
		const isDisabled = disabled || forceState === "disabled";

		const statusClass = isIndeterminate
			? "ore-checkbox--indeterminate"
			: isChecked
				? "ore-checkbox--checked"
				: "ore-checkbox--unchecked";

		const classes = ["ore-checkbox", `ore-checkbox--${color}`, statusClass, className ?? ""]
			.filter(Boolean)
			.join(" ");

		const wrapClasses = [
			"ore-checkbox-wrap",
			`ore-checkbox-wrap--${size}`,
			isDisabled ? "ore-checkbox-wrap--disabled" : "",
		]
			.filter(Boolean)
			.join(" ");

		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (isDisabled) {
				e.preventDefault();
				return;
			}
			onChange?.(!isChecked);
			onClick?.(e);
		};

		const buttonEl = (
			<button
				ref={ref}
				id={controlId}
				type="button"
				role="checkbox"
				aria-checked={isIndeterminate ? "mixed" : isChecked}
				disabled={isDisabled}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={handleClick}
				{...rest}
			>
				<span className="ore-checkbox__face">
					<span className="ore-checkbox__content">
						{(isChecked || isIndeterminate) && (
							<span className="ore-checkbox__icon" aria-hidden="true">
								{isIndeterminate ? <PixelIndeterminateIcon /> : <PixelCheckIcon />}
							</span>
						)}
					</span>
				</span>
			</button>
		);

		if (!label) {
			return <span className={wrapClasses}>{buttonEl}</span>;
		}

		return (
			<span className={wrapClasses}>
				{buttonEl}
				<label htmlFor={controlId} className="ore-checkbox__label">
					{label}
				</label>
			</span>
		);
	}
);

OreCheckbox.displayName = "OreCheckbox";
