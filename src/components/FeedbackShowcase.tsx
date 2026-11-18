import React, { useState } from "react";
import {
	OreBanner,
	OreLabeledDivider,
	OreProgressBar,
	OreTag,
	type OrePastelColor,
	type OreProgressBarColor,
	type OreProgressBarTone,
} from "../ore-ui-react";

const PB_COLORS: OreProgressBarColor[] = [
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

export function ProgressBarShowcase() {
	const [value, setValue] = useState(58);
	const [tone, setTone] = useState<OreProgressBarTone>("vibrant");

	return (
		<div className="my-6 flex flex-col gap-5">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#d4d4d8]">
					<label className="flex items-center gap-2">
						<span>Progress ({value}%):</span>
						<input
							type="range"
							min={0}
							max={100}
							value={value}
							onChange={(e) => setValue(Number(e.target.value))}
						/>
					</label>
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
				</div>
				<div className="flex flex-col gap-3 p-4 bg-[#141415] border border-[#2c2c2e]">
					{PB_COLORS.map((c) => (
						<div key={c} className="grid grid-cols-[100px_1fr] items-center gap-3">
							<span className="text-xs font-sans text-[#a3a3a3]">{c}</span>
							<OreProgressBar value={value} color={c} tone={tone} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function BannerShowcase() {
	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<OreBanner
				leadingIcon={<PixelInfoIcon />}
				title="New Resource Pack Available"
				description="Download the latest Ore UI texture pack from Marketplace."
			/>
			<OreBanner
				leadingIcon={<PixelInfoIcon />}
				trailingIcon={<PixelInfoIcon />}
				title="Your text goes here..."
			/>
			<OreBanner
				trailingIcon={<PixelInfoIcon />}
				title="Descriptive Banner Without Leading Icon"
				description="Your descriptive text goes here..."
			/>
		</div>
	);
}

const PASTEL_COLORS: OrePastelColor[] = [
	"gray",
	"dark-gray",
	"red",
	"pink",
	"purple",
	"blue",
	"turquoise",
	"green",
	"yellow",
	"orange",
];

export function TagShowcase() {
	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<div className="flex flex-wrap gap-2">
				{PASTEL_COLORS.map((c) => (
					<OreTag key={c} color={c}>
						{c}
					</OreTag>
				))}
			</div>
			<div className="flex flex-wrap gap-2">
				<OreTag color="green" leadingIcon={<PixelInfoIcon />}>
					Leading Icon
				</OreTag>
				<OreTag color="blue" trailingIcon={<PixelInfoIcon />}>
					Trailing Icon
				</OreTag>
				<OreTag color="purple" leadingIcon={<PixelInfoIcon />} trailingIcon={<PixelInfoIcon />}>
					Both Icons
				</OreTag>
			</div>
		</div>
	);
}

export function LabeledDividerShowcase() {
	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			{PASTEL_COLORS.map((c) => (
				<OreLabeledDivider key={c} color={c}>
					{c}
				</OreLabeledDivider>
			))}
		</div>
	);
}
