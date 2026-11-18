import React from "react";

export type OreSwitchColor = "colored" | "general" | "destructive" | "warning" | "realms";

export type OreSwitchState = "default" | "hover" | "focus" | "focus-hover" | "disabled";

export type OreSwitchSize = "sm" | "md" | "lg";

export interface OreSwitchProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange"> {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	color?: OreSwitchColor;
	hasIcon?: boolean;
	size?: OreSwitchSize;
	forceState?: OreSwitchState;
}

function PixelCircleIcon() {
	return (
		<svg viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M1 0H4V1H1V0ZM0 1H1V4H0V1ZM4 1H5V4H4V1ZM1 4H4V5H1V4Z" fill="currentColor" />
		</svg>
	);
}

export const OreSwitch = React.forwardRef<HTMLButtonElement, OreSwitchProps>(
	(
		{
			checked = false,
			onChange,
			color = "colored",
			hasIcon = false,
			size = "md",
			forceState,
			disabled = false,
			className,
			onClick,
			...rest
		},
		ref
	) => {
		const isDisabled = disabled || forceState === "disabled";
		const classes = [
			"ore-switch",
			`ore-switch--${color}`,
			`ore-switch--${size}`,
			checked ? "ore-switch--on" : "ore-switch--off",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (isDisabled) {
				e.preventDefault();
				return;
			}
			onChange?.(!checked);
			onClick?.(e);
		};

		return (
			<button
				ref={ref}
				type="button"
				role="switch"
				aria-checked={checked}
				disabled={isDisabled}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={handleClick}
				{...rest}
			>
				<span className="ore-switch__track" aria-hidden="true">
					<span className="ore-switch__track-fill">
						{hasIcon && <span className="ore-switch__sym-on" />}
						{hasIcon && (
							<span className="ore-switch__sym-off">
								<PixelCircleIcon />
							</span>
						)}
					</span>
				</span>
				<span className="ore-switch__handle" aria-hidden="true">
					<span className="ore-switch__handle-face">
						<span className="ore-switch__handle-light" />
					</span>
					<span className="ore-switch__handle-shadow" />
				</span>
			</button>
		);
	}
);

OreSwitch.displayName = "OreSwitch";
