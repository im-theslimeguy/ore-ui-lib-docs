import React, { useState } from "react";
import {
	OreHorizontalNavGroup,
	OreHorizontalNavItem,
	OreSelectableButton,
	OreSelectableButtonGroup,
	OreSelectableIconButton,
	OreSelectableIconGroup,
	OreSlider,
} from "../ore-ui-react";

function PixelStarIcon() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M5 1H7V4H10V6H8V7H9V10H7V8H5V10H3V7H4V6H2V4H5V1Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function SliderShowcase() {
	const [continuous, setContinuous] = useState(50);
	const [segmented, setSegmented] = useState(50);

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="flex justify-between text-xs font-sans text-[#a3a3a3]">
					<span>Continuous Slider (Arrow keys jump 5%)</span>
					<strong className="text-white">{Math.round(continuous)}%</strong>
				</div>
				<OreSlider value={continuous} onChange={setContinuous} color="colored" />
			</div>

			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="flex justify-between text-xs font-sans text-[#a3a3a3]">
					<span>Segmented Slider (5 segments, smooth drag + spring pull on release)</span>
					<strong className="text-white">{Math.round(segmented)}%</strong>
				</div>
				<OreSlider value={segmented} segments={5} onChange={setSegmented} color="colored" />
			</div>

			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<span className="text-xs font-sans text-[#a3a3a3]">Color Variants & Disabled</span>
				<OreSlider value={70} color="general" onChange={() => {}} />
				<OreSlider value={60} color="destructive" onChange={() => {}} />
				<OreSlider value={40} color="warning" onChange={() => {}} />
				<OreSlider value={80} color="realms" onChange={() => {}} />
				<OreSlider value={50} disabled />
			</div>
		</div>
	);
}

export function SelectableButtonShowcase() {
	const [mode, setMode] = useState("survival");

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Selected: <strong className="text-white">{mode}</strong>
			</div>
			<OreSelectableButtonGroup value={mode} onChange={setMode} aria-label="Game Mode">
				<OreSelectableButton value="survival" badge={1}>
					Survival
				</OreSelectableButton>
				<OreSelectableButton value="creative" icon={<PixelStarIcon />}>
					Creative
				</OreSelectableButton>
				<OreSelectableButton value="adventure">Adventure</OreSelectableButton>
			</OreSelectableButtonGroup>
		</div>
	);
}

export function HorizontalNavbarShowcase() {
	const [tab, setTab] = useState("worlds");

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Active tab: <strong className="text-white">{tab}</strong>
			</div>
			<OreHorizontalNavGroup value={tab} onChange={setTab} aria-label="Play Tabs">
				<OreHorizontalNavItem value="worlds" badge={3}>
					Worlds
				</OreHorizontalNavItem>
				<OreHorizontalNavItem value="friends" icon={<PixelStarIcon />}>
					Friends
				</OreHorizontalNavItem>
				<OreHorizontalNavItem value="servers">Servers</OreHorizontalNavItem>
			</OreHorizontalNavGroup>
		</div>
	);
}

export function SelectableIconButtonShowcase() {
	const [pack, setPack] = useState("vanilla");

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Selected tile: <strong className="text-white">{pack}</strong> (32px / 8*--ore-px gap)
			</div>
			<OreSelectableIconGroup value={pack} onChange={setPack} aria-label="Resource Packs">
				<OreSelectableIconButton value="vanilla" icon={<PixelStarIcon />}>
					Vanilla
				</OreSelectableIconButton>
				<OreSelectableIconButton value="classic" icon={<PixelStarIcon />}>
					Classic
				</OreSelectableIconButton>
				<OreSelectableIconButton value="plastic" icon={<PixelStarIcon />} />
				<OreSelectableIconButton value="locked" icon={<PixelStarIcon />} disabled>
					Locked
				</OreSelectableIconButton>
			</OreSelectableIconGroup>
		</div>
	);
}
