import React, { useState } from "react";
import { OreMenuButton, OreMenuGroup } from "../OreMenuButton/OreMenuButton";
import { OrePopup, OrePopupHeader } from "../OrePopup/OrePopup";

export interface OreDropdownOption {
	value: string;
	label: React.ReactNode;
	icon?: React.ReactNode;
}

export type OreDropdownSize = "sm" | "md" | "lg";

export type OreDropdownState =
	| "default"
	| "hover"
	| "focus"
	| "focus-hover"
	| "pressed"
	| "pressed-hover"
	| "disabled";

export interface OreDropdownProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
	options: OreDropdownOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	popupTitle?: React.ReactNode;
	size?: OreDropdownSize;
	fullWidth?: boolean;
	forceState?: OreDropdownState;
}

function PixelChevronDown() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M2 3H4V5H5V7H7V5H8V3H10V5H8V7H7V9H5V7H4V5H2V3Z" fill="currentColor" />
		</svg>
	);
}

export const OreDropdown = React.forwardRef<HTMLButtonElement, OreDropdownProps>(
	(
		{
			options,
			value,
			onChange,
			placeholder = "Select...",
			popupTitle = "Select Option",
			size = "md",
			fullWidth = false,
			forceState,
			disabled = false,
			className,
			onClick,
			...rest
		},
		ref
	) => {
		const [open, setOpen] = useState(false);
		const isDisabled = disabled || forceState === "disabled";
		const selected = options.find((opt) => opt.value === value);

		const classes = [
			"ore-dropdown",
			`ore-dropdown--${size}`,
			fullWidth ? "ore-dropdown--full-width" : "",
			className ?? "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<>
				<button
					ref={ref}
					type="button"
					aria-haspopup="dialog"
					aria-expanded={open}
					disabled={isDisabled}
					className={classes}
					data-state={forceState && forceState !== "default" ? forceState : undefined}
					onClick={(e) => {
						if (isDisabled) {
							e.preventDefault();
							return;
						}
						setOpen(true);
						onClick?.(e);
					}}
					{...rest}
				>
					<span className="ore-dropdown__container">
						<span className="ore-dropdown__background">
							<span className="ore-dropdown__content">
								<span className="ore-dropdown__label">
									{selected ? selected.label : placeholder}
								</span>
								<span className="ore-dropdown__icon" aria-hidden="true">
									<PixelChevronDown />
								</span>
							</span>
						</span>
						<span className="ore-dropdown__shadow" aria-hidden="true" />
					</span>
				</button>

				<OrePopup modal open={open} onClose={() => setOpen(false)} size={size}>
					<OrePopupHeader title={popupTitle} size={size} onClose={() => setOpen(false)} />
					<OreMenuGroup>
						{options.map((option) => (
							<OreMenuButton
								key={option.value}
								size={size}
								icon={option.icon}
								onClick={() => {
									onChange?.(option.value);
									setOpen(false);
								}}
							>
								{option.label}
							</OreMenuButton>
						))}
					</OreMenuGroup>
				</OrePopup>
			</>
		);
	}
);

OreDropdown.displayName = "OreDropdown";
