import React, { useState } from "react";
import {
	OreButton,
	OreMessage,
	OrePagination,
	OreToast,
	OreTooltip,
	type OreProgressBarColor,
	type OreProgressBarTone,
} from "../ore-ui-react";

const MSG_COLORS: OreProgressBarColor[] = [
	"blue",
	"turquoise",
	"green",
	"red",
	"pink",
	"yellow",
	"orange",
	"purple",
	"gray",
	"dark-gray",
];

function PixelInfoIcon() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M5 1H7V3H5V1ZM5 5H7V11H5V5ZM1 1H11V11H1V1ZM2 2V10H10V2H2Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function MessageShowcase() {
	const [tone, setTone] = useState<OreProgressBarTone>("vibrant");

	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<div className="flex gap-2">
				{(["vibrant", "pastel"] as const).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setTone(t)}
						className={`px-3 py-1 text-xs font-block border cursor-pointer ${
							tone === t
								? "bg-[#387e24] border-[#50913d] text-white"
								: "bg-[#292929] border-[#404040] text-[#a3a3a3]"
						}`}
					>
						{t}
					</button>
				))}
			</div>
			<div className="flex flex-col gap-2">
				{MSG_COLORS.map((c) => (
					<OreMessage key={c} color={c} tone={tone} leadingIcon={<PixelInfoIcon />}>
						{tone} {c} message strip
					</OreMessage>
				))}
			</div>
		</div>
	);
}

export function ToastShowcase() {
	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#292929] border border-[#3a3a3a] items-start">
			<OreToast>Write your text here...</OreToast>
			<OreToast leadingIcon={<PixelInfoIcon />}>World saved successfully (Noto Sans)</OreToast>
			<OreToast leadingIcon={<PixelInfoIcon />} trailingIcon={<PixelInfoIcon />}>
				Achievement Unlocked!
			</OreToast>
		</div>
	);
}

export function TooltipShowcase() {
	return (
		<div className="my-6 flex flex-wrap gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a] items-center">
			<OreTooltip content="Short cursor-following tooltip" leadingIcon={<PixelInfoIcon />}>
				<OreButton color="colored">Hover for Short Tooltip</OreButton>
			</OreTooltip>
			<OreTooltip content="This is a much longer tooltip message that automatically wraps across multiple lines and flips its tail placement near viewport edges.">
				<OreButton color="general">Hover for Multi-line Tooltip</OreButton>
			</OreTooltip>
		</div>
	);
}

export function PaginationShowcase() {
	const [page, setPage] = useState(1);

	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Current page: <strong className="text-white">{page}</strong> / 10
			</div>
			<div className="overflow-x-auto pb-2">
				<OrePagination currentPage={page} totalPages={10} onPageChange={setPage} />
			</div>
		</div>
	);
}
