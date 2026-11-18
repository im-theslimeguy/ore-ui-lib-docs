import React, { useId } from "react";

export type OreRadioColor = "colored" | "general" | "destructive" | "warning" | "realms";

export type OreRadioState =
	| "default"
	| "hover"
	| "focus"
	| "focus-hover"
	| "pressed"
	| "pressed-hover"
	| "disabled";

export type OreRadioSize = "sm" | "md" | "lg";

export interface OreRadioProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange"> {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	color?: OreRadioColor;
	size?: OreRadioSize;
	forceState?: OreRadioState;
	label?: React.ReactNode;
}

export const OreRadio = React.forwardRef<HTMLButtonElement, OreRadioProps>(
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
		const isDisabled = disabled || forceState === "disabled";

		const classes = [
			"ore-radio",
			`ore-radio--${color}`,
			checked ? "ore-radio--checked" : "ore-radio--unchecked",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		const wrapClasses = [
			"ore-radio-wrap",
			`ore-radio-wrap--${size}`,
			isDisabled ? "ore-radio-wrap--disabled" : "",
		]
			.filter(Boolean)
			.join(" ");

		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (isDisabled) {
				e.preventDefault();
				return;
			}
			onChange?.(true);
			onClick?.(e);
		};

		const buttonEl = (
			<button
				ref={ref}
				id={controlId}
				type="button"
				role="radio"
				aria-checked={checked}
				disabled={isDisabled}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={handleClick}
				{...rest}
			>
				<span className="ore-radio__diamond" aria-hidden="true">
					<span className="ore-radio__face">
						{checked && (
							<span className="ore-radio__dot">
								<span className="ore-radio__q-tl" />
								<span className="ore-radio__q-tr" />
								<span className="ore-radio__q-bl" />
								<span className="ore-radio__q-br" />
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
				<label htmlFor={controlId} className="ore-radio__label">
					{label}
				</label>
			</span>
		);
	}
);

OreRadio.displayName = "OreRadio";
