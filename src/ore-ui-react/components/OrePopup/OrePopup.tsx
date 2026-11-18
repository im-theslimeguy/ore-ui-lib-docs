import React, { useEffect } from "react";
import { OreSeamlessButton } from "../OreSeamlessButton/OreSeamlessButton";

export type OrePopupSize = "sm" | "md" | "lg";

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

export interface OrePopupHeaderProps {
	title: React.ReactNode;
	badge?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	onClose?: () => void;
	closeLabel?: string;
	size?: OrePopupSize;
	className?: string;
}

export function OrePopupHeader({
	title,
	badge,
	trailingIcon,
	onClose,
	closeLabel = "Close dialog",
	size = "md",
	className,
}: OrePopupHeaderProps) {
	return (
		<div className={["ore-popup-header", className ?? ""].filter(Boolean).join(" ")}>
			<div className="ore-popup-header__content">
				<div className="ore-popup-header__title">{title}</div>
				{(badge !== undefined || trailingIcon || onClose) && (
					<div className="ore-popup-header__trailing">
						{badge !== undefined && badge !== null && (
							<span className="ore-popup-header__badge">{badge}</span>
						)}
						{trailingIcon}
						{onClose && (
							<OreSeamlessButton
								theme="dark"
								size={size}
								icon={<PixelCloseIcon />}
								aria-label={closeLabel}
								onClick={onClose}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export interface OrePopupContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function OrePopupContent({ className, children, ...rest }: OrePopupContentProps) {
	return (
		<div className={["ore-popup-content", className ?? ""].filter(Boolean).join(" ")} {...rest}>
			{children}
		</div>
	);
}

export interface OrePopupActionsProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "vertical" | "horizontal";
	children: React.ReactNode;
}

export function OrePopupActions({
	orientation = "vertical",
	className,
	children,
	...rest
}: OrePopupActionsProps) {
	const classes = [
		"ore-popup-actions",
		orientation === "horizontal" ? "ore-popup-actions--horizontal" : "ore-popup-actions--vertical",
		className ?? "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes} {...rest}>
			<div className="ore-popup-actions__content">{children}</div>
		</div>
	);
}

export interface OrePopupProps extends React.HTMLAttributes<HTMLDivElement> {
	/** When `modal` is true, renders centered in a fixed backdrop controlled by `open`. */
	modal?: boolean;
	open?: boolean;
	onClose?: () => void;
	size?: OrePopupSize;
	children: React.ReactNode;
}

export function OrePopup({
	modal = false,
	open = true,
	onClose,
	size = "md",
	className,
	children,
	...rest
}: OrePopupProps) {
	useEffect(() => {
		if (!modal || !open || !onClose) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [modal, open, onClose]);

	if (modal && !open) return null;

	const popup = (
		<div
			role="dialog"
			aria-modal={modal || undefined}
			className={["ore-popup", `ore-popup--${size}`, className ?? ""].filter(Boolean).join(" ")}
			{...rest}
		>
			<div className="ore-popup__inner">{children}</div>
		</div>
	);

	if (!modal) return popup;

	return (
		<div
			className="ore-popup-backdrop"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose?.();
			}}
		>
			{popup}
		</div>
	);
}
