import React from "react";

export type OreToastSize = "sm" | "md" | "lg";

export interface OreToastProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: OreToastSize;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	children: React.ReactNode;
}

export function OreToast({
	size = "md",
	leadingIcon,
	trailingIcon,
	className,
	children,
	...rest
}: OreToastProps) {
	const classes = ["ore-toast", `ore-toast--${size}`, className ?? ""].filter(Boolean).join(" ");

	return (
		<div role="status" className={classes} {...rest}>
			<div className="ore-toast__leading">
				{leadingIcon && (
					<span className="ore-toast__icon ore-toast__icon--leading" aria-hidden="true">
						{leadingIcon}
					</span>
				)}
				<span className="ore-toast__text">{children}</span>
			</div>
			{trailingIcon && (
				<span className="ore-toast__icon ore-toast__icon--trailing" aria-hidden="true">
					{trailingIcon}
				</span>
			)}
		</div>
	);
}
