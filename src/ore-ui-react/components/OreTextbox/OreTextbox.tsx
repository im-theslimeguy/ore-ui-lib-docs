import React from "react";

export type OreTextboxSize = "sm" | "md" | "lg";

export type OreTextboxState = "default" | "focus" | "disabled";

export interface OreTextboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: OreTextboxSize;
	invalid?: boolean;
	trailingIcon?: React.ReactNode;
	forceState?: OreTextboxState;
}

export const OreTextbox = React.forwardRef<HTMLInputElement, OreTextboxProps>(
	(
		{
			size = "md",
			invalid = false,
			trailingIcon,
			forceState,
			disabled = false,
			className,
			...rest
		},
		ref
	) => {
		const isDisabled = disabled || forceState === "disabled";
		const classes = [
			"ore-textbox",
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
					<input
						ref={ref}
						disabled={isDisabled}
						aria-invalid={invalid || undefined}
						className="ore-textbox__input"
						{...rest}
					/>
					{trailingIcon && (
						<span className="ore-textbox__trailing" aria-hidden="true">
							{trailingIcon}
						</span>
					)}
				</div>
			</div>
		);
	}
);

OreTextbox.displayName = "OreTextbox";
