import React, { useState } from "react";
import {
	OreDropdown,
	OreLoadingBar,
	OreSpinner,
	OreTabBar,
	OreTabBarButton,
} from "../ore-ui-react";

function PixelChevronLeft() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M7 2H9V4H7V2ZM5 4H7V5H5V4ZM3 5H5V7H3V5ZM5 7H7V8H5V7ZM7 8H9V10H7V8Z" fill="currentColor" />
		</svg>
	);
}

function PixelGearIcon() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M5 1H7V3H8V2H10V4H9V5H11V7H9V8H10V10H8V9H7V11H5V9H4V10H2V8H3V7H1V5H3V4H2V2H4V3H5V1ZM5 5V7H7V5H5Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function DropdownShowcase() {
	const [difficulty, setDifficulty] = useState("normal");

	return (
		<div className="my-6 flex flex-col gap-5 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Selected difficulty: <strong className="text-white">{difficulty}</strong> (click to open Popup menu)
			</div>
			<div className="max-w-[380px] flex flex-col gap-4">
				<OreDropdown
					popupTitle="Select Difficulty"
					value={difficulty}
					onChange={setDifficulty}
					fullWidth
					options={[
						{ value: "peaceful", label: "Peaceful" },
						{ value: "easy", label: "Easy" },
						{ value: "normal", label: "Normal" },
						{ value: "hard", label: "Hard" },
					]}
				/>
				<OreDropdown
					value="locked"
					disabled
					fullWidth
					options={[{ value: "locked", label: "Disabled Dropdown" }]}
				/>
			</div>
		</div>
	);
}

export function TabBarShowcase() {
	return (
		<div className="my-6 flex flex-col gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<OreTabBar title="PLAY" />
			<OreTabBar
				title="SETTINGS"
				leading={<OreTabBarButton icon={<PixelChevronLeft />} aria-label="Back" />}
			/>
			<OreTabBar
				title="MARKETPLACE"
				leading={<OreTabBarButton icon={<PixelChevronLeft />} aria-label="Back" />}
				trailing={<OreTabBarButton icon={<PixelGearIcon />} aria-label="Options" />}
			/>
			<OreTabBar
				title="WORLDS"
				leading={<OreTabBarButton icon={<PixelChevronLeft />}>Back</OreTabBarButton>}
				trailing={<OreTabBarButton>Edit</OreTabBarButton>}
			/>
		</div>
	);
}

export function TabBarButtonShowcase() {
	return (
		<div className="my-6 flex flex-wrap items-center gap-4 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
			<div className="h-[54px] flex">
				<OreTabBarButton icon={<PixelChevronLeft />} aria-label="Back" />
			</div>
			<div className="h-[54px] flex">
				<OreTabBarButton icon={<PixelGearIcon />}>Settings</OreTabBarButton>
			</div>
			<div className="h-[54px] flex">
				<OreTabBarButton>Label</OreTabBarButton>
			</div>
			<div className="h-[54px] flex">
				<OreTabBarButton forceState="hover" icon={<PixelGearIcon />}>
					Hovered
				</OreTabBarButton>
			</div>
			<div className="h-[54px] flex">
				<OreTabBarButton forceState="focus" icon={<PixelChevronLeft />} aria-label="Focused" />
			</div>
		</div>
	);
}

export function SpinnerShowcase() {
	return (
		<div className="my-6 flex flex-col gap-5">
			<div className="flex flex-wrap items-center gap-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a]">
				<div className="flex items-center gap-3">
					<OreSpinner theme="light" size="sm" />
					<OreSpinner theme="light" size="md" />
					<OreSpinner theme="light" size="lg" />
				</div>
				<div className="p-4 bg-[#d0d1d5] flex items-center gap-3">
					<OreSpinner theme="dark" size="sm" />
					<OreSpinner theme="dark" size="md" />
					<OreSpinner theme="dark" size="lg" />
				</div>
			</div>

			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-3">
				<span className="text-xs font-sans text-[#a3a3a3]">All 16 Frames (1–16)</span>
				<div className="flex flex-wrap gap-3">
					{Array.from({ length: 16 }, (_, i) => i + 1).map((step) => (
						<div key={step} className="flex flex-col items-center gap-1.5 p-2 bg-[#141415] border border-[#2c2c2e]">
							<OreSpinner theme="light" size="md" step={step} />
							<span className="text-[10px] font-mono text-[#888888]">{step}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function LoadingBarShowcase() {
	return (
		<div className="my-6 flex flex-col gap-5">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-3">
				<span className="text-xs font-sans text-[#a3a3a3]">Light Theme (Animated Indeterminate)</span>
				<OreLoadingBar theme="light" size="md" />
			</div>
			<div className="p-5 bg-[#d0d1d5] border border-[#1e1e1f] flex flex-col gap-3">
				<span className="text-xs font-sans text-[#1e1e20]">Dark Theme (Animated Indeterminate)</span>
				<OreLoadingBar theme="dark" size="md" />
			</div>
		</div>
	);
}
