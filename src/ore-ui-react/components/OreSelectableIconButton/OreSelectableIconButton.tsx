import React, { createContext, useContext } from "react";

export type OreSelectableIconSize = "sm" | "md" | "lg";

interface SelectableIconGroupContextValue {
	value: string;
	onChange: (value: string) => void;
	size: OreSelectableIconSize;
}

const SelectableIconGroupContext = createContext<SelectableIconGroupContextValue | null>(null);

export interface OreSelectableIconGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	size?: OreSelectableIconSize;
	children: React.ReactNode;
}

export function OreSelectableIconGroup({
	value,
	onChange,
	size = "md",
	className,
	children,
	...rest
}: OreSelectableIconGroupProps) {
	const classes = ["ore-sel-icon-group", `ore-sel-icon-group--${size}`, className ?? ""]
		.filter(Boolean)
		.join(" ");

	return (
		<SelectableIconGroupContext.Provider value={{ value, onChange, size }}>
			<div role="radiogroup" className={classes} {...rest}>
				{children}
			</div>
		</SelectableIconGroupContext.Provider>
	);
}

export interface OreSelectableIconButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
	value?: string;
	selected?: boolean;
	icon: React.ReactNode;
	size?: OreSelectableIconSize;
	children?: React.ReactNode;
}

export const OreSelectableIconButton = React.forwardRef<HTMLButtonElement, OreSelectableIconButtonProps>(
	(
		{
			value,
			selected,
			icon,
			size,
			disabled = false,
			className,
			children,
			onClick,
			...rest
		},
		ref
	) => {
		const ctx = useContext(SelectableIconGroupContext);
		const effectiveSize = size ?? ctx?.size ?? "md";
		const isSelected = selected ?? (ctx && value !== undefined ? ctx.value === value : false);
		const hasLabel = children !== undefined && children !== null && children !== "";

		const classes = [
			"ore-sel-icon-btn",
			`ore-sel-icon-btn--${effectiveSize}`,
			isSelected ? "ore-sel-icon-btn--selected" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type="button"
				role={ctx ? "radio" : undefined}
				aria-checked={ctx ? isSelected : undefined}
				aria-pressed={!ctx ? isSelected : undefined}
				disabled={disabled}
				className={classes}
				onClick={(e) => {
					if (disabled) {
						e.preventDefault();
						return;
					}
					if (ctx && value !== undefined) {
						ctx.onChange(value);
					}
					onClick?.(e);
				}}
				{...rest}
			>
				<span className="ore-sel-icon-btn__container">
					<span className="ore-sel-icon-btn__face">
						<span className="ore-sel-icon-btn__content">
							<span className="ore-sel-icon-btn__icon" aria-hidden="true">
								{icon}
							</span>
							{hasLabel && <span className="ore-sel-icon-btn__label">{children}</span>}
						</span>
					</span>
					<span className="ore-sel-icon-btn__shadow" aria-hidden="true" />
				</span>
			</button>
		);
	}
);

OreSelectableIconButton.displayName = "OreSelectableIconButton";
