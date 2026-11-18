import React from "react";

export type OreBannerSize = "sm" | "md" | "lg";

export interface OreBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	title: React.ReactNode;
	description?: React.ReactNode;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	size?: OreBannerSize;
}

export function OreBanner({
	title,
	description,
	leadingIcon,
	trailingIcon,
	size = "md",
	className,
	...rest
}: OreBannerProps) {
	const classes = ["ore-banner", `ore-banner--${size}`, className ?? ""].filter(Boolean).join(" ");

	return (
		<div className={classes} {...rest}>
			<div className="ore-banner__content">
				<div className="ore-banner__leading-wrap">
					{leadingIcon && (
						<span className="ore-banner__icon" aria-hidden="true">
							{leadingIcon}
						</span>
					)}
					<div className="ore-banner__texts">
						<div className="ore-banner__title">{title}</div>
						{description && <div className="ore-banner__description">{description}</div>}
					</div>
				</div>
				{trailingIcon && (
					<span className="ore-banner__icon" aria-hidden="true">
						{trailingIcon}
					</span>
				)}
			</div>
		</div>
	);
}
