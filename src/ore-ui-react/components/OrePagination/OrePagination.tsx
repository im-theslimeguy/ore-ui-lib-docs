import React from "react";
import { OreButton } from "../OreButton/OreButton";

export type OrePaginationSize = "sm" | "md" | "lg";

function PixelChevronLeft() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M7 2H9V4H7V2ZM5 4H7V5H5V4ZM3 5H5V7H3V5ZM5 7H7V8H5V7ZM7 8H9V10H7V8Z" fill="currentColor" />
		</svg>
	);
}

function PixelChevronRight() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M3 2H5V4H3V2ZM5 4H7V5H5V4ZM7 5H9V7H7V5ZM5 7H7V8H5V7ZM3 8H5V10H3V8Z" fill="currentColor" />
		</svg>
	);
}

export interface OrePaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	page: React.ReactNode;
	selected?: boolean;
	ellipsis?: boolean;
}

export function OrePaginationItem({
	page,
	selected = false,
	ellipsis = false,
	className,
	...rest
}: OrePaginationItemProps) {
	if (ellipsis) {
		return (
			<span className={["ore-pagination__item ore-pagination__item--ellipsis", className ?? ""].filter(Boolean).join(" ")}>
				<span className="ore-pagination__item-face">{page}</span>
			</span>
		);
	}

	return (
		<button
			type="button"
			aria-current={selected ? "page" : undefined}
			className={[
				"ore-pagination__item",
				selected ? "ore-pagination__item--selected" : "",
				className ?? "",
			]
				.filter(Boolean)
				.join(" ")}
			{...rest}
		>
			<span className="ore-pagination__item-face">{page}</span>
			{selected && <span className="ore-pagination__item-line" aria-hidden="true" />}
		</button>
	);
}

export interface OrePaginationBarProps extends React.HTMLAttributes<HTMLDivElement> {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

function buildPages(current: number, total: number): Array<number | "..."> {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}
	if (current <= 4) {
		return [1, 2, 3, 4, 5, "...", total];
	}
	if (current >= total - 3) {
		return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
	}
	return [1, "...", current - 1, current, current + 1, "...", total];
}

export function OrePaginationBar({
	currentPage,
	totalPages,
	onPageChange,
	className,
	...rest
}: OrePaginationBarProps) {
	const items = buildPages(currentPage, totalPages);

	return (
		<div className={["ore-pagination__bar", className ?? ""].filter(Boolean).join(" ")} {...rest}>
			{items.map((item, idx) =>
				item === "..." ? (
					<OrePaginationItem key={`e-${idx}`} page="..." ellipsis />
				) : (
					<OrePaginationItem
						key={item}
						page={item}
						selected={item === currentPage}
						aria-label={`Page ${item}`}
						onClick={() => onPageChange(item)}
					/>
				)
			)}
		</div>
	);
}

export interface OrePaginationProps extends React.HTMLAttributes<HTMLElement> {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	size?: OrePaginationSize;
}

export function OrePagination({
	currentPage,
	totalPages,
	onPageChange,
	size = "md",
	className,
	...rest
}: OrePaginationProps) {
	const canPrev = currentPage > 1;
	const canNext = currentPage < totalPages;

	return (
		<nav
			aria-label="Pagination"
			className={["ore-pagination", `ore-pagination--${size}`, className ?? ""].filter(Boolean).join(" ")}
			{...rest}
		>
			{totalPages > 1 && (
				<OreButton
					color="general"
					size={size}
					icon={<PixelChevronLeft />}
					subtlyDisabled={!canPrev}
					aria-label="Previous page"
					className="ore-pagination__nav-btn"
					onClick={() => canPrev && onPageChange(currentPage - 1)}
				/>
			)}
			<OrePaginationBar
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
			{totalPages > 1 && (
				<OreButton
					color="general"
					size={size}
					icon={<PixelChevronRight />}
					subtlyDisabled={!canNext}
					aria-label="Next page"
					className="ore-pagination__nav-btn"
					onClick={() => canNext && onPageChange(currentPage + 1)}
				/>
			)}
		</nav>
	);
}
