import React, { createContext, useContext } from "react";

export type OreSelectableSize = "sm" | "md" | "lg";

interface SelectableGroupContextValue {
	value: string;
	onChange: (value: string) => void;
	size: OreSelectableSize;
}

const SelectableGroupContext = createContext<SelectableGroupContextValue | null>(null);

export interface OreSelectableButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	size?: OreSelectableSize;
	children: React.ReactNode;
}

export function OreSelectableButtonGroup({
	value,
	onChange,
	size = "md",
	className,
	children,
	...rest
}: OreSelectableButtonGroupProps) {
	const classes = ["ore-sel-group", `ore-sel-group--${size}`, className ?? ""].filter(Boolean).join(" ");

	return (
		<SelectableGroupContext.Provider value={{ value, onChange, size }}>
			<div role="radiogroup" className={classes} {...rest}>
				{children}
			</div>
		</SelectableGroupContext.Provider>
	);
}

export interface OreSelectableButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
	value: string;
	icon?: React.ReactNode;
	badge?: React.ReactNode;
	forceState?: "default" | "hover" | "focus";
	children: React.ReactNode;
}

export const OreSelectableButton = React.forwardRef<HTMLButtonElement, OreSelectableButtonProps>(
	({ value, icon, badge, forceState, disabled = false, className, children, onClick, ...rest }, ref) => {
		const ctx = useContext(SelectableGroupContext);
		if (!ctx) {
			throw new Error("OreSelectableButton must be used inside <OreSelectableButtonGroup>.");
		}

		const isSelected = ctx.value === value;
		const classes = [
			"ore-sel-btn",
			isSelected ? "ore-sel-btn--selected" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type="button"
				role="radio"
				aria-checked={isSelected}
				disabled={disabled}
				className={classes}
				data-state={forceState && forceState !== "default" ? forceState : undefined}
				onClick={(e) => {
					if (disabled) {
						e.preventDefault();
						return;
					}
					ctx.onChange(value);
					onClick?.(e);
				}}
				{...rest}
			>
				<span className="ore-sel-btn__container">
					<span className="ore-sel-btn__face">
						<span className="ore-sel-btn__content">
							{icon && (
								<span className="ore-sel-btn__icon" aria-hidden="true">
									{icon}
								</span>
							)}
							<span className="ore-sel-btn__label">{children}</span>
							{badge !== undefined && badge !== null && (
								<span className="ore-sel-btn__badge">{badge}</span>
							)}
						</span>
					</span>
					<span className="ore-sel-btn__shadow" aria-hidden="true" />
				</span>
				<span className="ore-sel-btn__line" aria-hidden="true" />
			</button>
		);
	}
);

OreSelectableButton.displayName = "OreSelectableButton";
