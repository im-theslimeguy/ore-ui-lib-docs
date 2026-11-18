import React, { useState } from "react";
import {
	OreButton,
	type OreButtonColor,
	type OreButtonOrientation,
	type OreButtonSize,
	type OreButtonState,
} from "../ore-ui-react";

const COLORS: Array<{ id: OreButtonColor; label: string }> = [
	{ id: "colored", label: "Colored" },
	{ id: "general", label: "General" },
	{ id: "destructive", label: "Destructive" },
	{ id: "warning", label: "Warning" },
	{ id: "realms", label: "Realms" },
];

const STATES: Array<{ id: OreButtonState; label: string }> = [
	{ id: "default", label: "Default" },
	{ id: "hover", label: "Hovered" },
	{ id: "focus", label: "Focused" },
	{ id: "focus-hover", label: "Focused + Hover" },
	{ id: "pressed", label: "Pressed" },
	{ id: "pressed-hover", label: "Pressed + Hover" },
	{ id: "subtly-disabled", label: "Subtly Disabled" },
	{ id: "disabled", label: "Disabled" },
];

export function PixelPlayIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M4 2H6V4H8V6H10V7H12V9H10V10H8V12H6V14H4V2ZM6 5V11H8V9H10V7H8V5H6Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function ActionBarPreview() {
	return (
		<div className="my-6 p-6 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-wrap gap-3 items-center">
			<OreButton color="colored" icon={<PixelPlayIcon />}>
				Play
			</OreButton>
			<OreButton color="general">Settings</OreButton>
			<OreButton color="realms">Realms</OreButton>
			<OreButton color="warning">Warning</OreButton>
			<OreButton color="destructive">Delete</OreButton>
		</div>
	);
}

export function ButtonPlayground() {
	const [color, setColor] = useState<OreButtonColor>("colored");
	const [contentMode, setContentMode] = useState<"text" | "text-icon" | "icon">("text-icon");
	const [orientation, setOrientation] = useState<OreButtonOrientation>("horizontal");
	const [size, setSize] = useState<OreButtonSize>("md");
	const [subtlyDisabled, setSubtlyDisabled] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [clicks, setClicks] = useState(0);

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-5">
			<div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#333333]">
				<div className="flex flex-wrap gap-2">
					{COLORS.map((c) => (
						<button
							key={c.id}
							type="button"
							onClick={() => setColor(c.id)}
							className={`px-3 py-1.5 text-xs font-block border cursor-pointer ${
								color === c.id
									? "bg-[#387e24] border-[#50913d] text-white"
									: "bg-[#292929] border-[#404040] text-[#a3a3a3] hover:text-white"
							}`}
						>
							{c.label}
						</button>
					))}
				</div>
				<span className="text-xs font-mono text-[#888888]">Clicks: {clicks}</span>
			</div>

			<div className="flex flex-wrap gap-3 text-xs font-sans">
				<label className="flex items-center gap-2 text-[#d4d4d8]">
					<span>Content:</span>
					<select
						value={contentMode}
						onChange={(e) => setContentMode(e.target.value as "text" | "text-icon" | "icon")}
						className="bg-[#292929] border border-[#404040] px-2 py-1 text-white"
					>
						<option value="text">Text</option>
						<option value="text-icon">Text & Icon</option>
						<option value="icon">Icon Only</option>
					</select>
				</label>

				<label className="flex items-center gap-2 text-[#d4d4d8]">
					<span>Orientation:</span>
					<select
						value={orientation}
						onChange={(e) => setOrientation(e.target.value as OreButtonOrientation)}
						className="bg-[#292929] border border-[#404040] px-2 py-1 text-white"
					>
						<option value="horizontal">Horizontal</option>
						<option value="vertical">Vertical</option>
					</select>
				</label>

				<label className="flex items-center gap-2 text-[#d4d4d8]">
					<span>Size:</span>
					<select
						value={size}
						onChange={(e) => setSize(e.target.value as OreButtonSize)}
						className="bg-[#292929] border border-[#404040] px-2 py-1 text-white"
					>
						<option value="sm">sm (0.375x)</option>
						<option value="md">md (0.5x)</option>
						<option value="lg">lg (1x Figma)</option>
					</select>
				</label>

				<label className="flex items-center gap-1.5 text-[#d4d4d8] cursor-pointer">
					<input
						type="checkbox"
						checked={subtlyDisabled}
						onChange={(e) => setSubtlyDisabled(e.target.checked)}
					/>
					<span>subtlyDisabled</span>
				</label>

				<label className="flex items-center gap-1.5 text-[#d4d4d8] cursor-pointer">
					<input
						type="checkbox"
						checked={disabled}
						onChange={(e) => setDisabled(e.target.checked)}
					/>
					<span>disabled</span>
				</label>
			</div>

			<div className="min-h-[120px] flex flex-col items-center justify-center gap-4 p-6 bg-[#141415] border border-[#2c2c2e]">
				<div className="flex flex-wrap items-center justify-center gap-3">
					<OreButton
						color={color}
						orientation={orientation}
						size={size}
						subtlyDisabled={subtlyDisabled}
						disabled={disabled}
						icon={contentMode !== "text" ? <PixelPlayIcon /> : undefined}
						aria-label={contentMode === "icon" ? "Play" : undefined}
						onClick={() => setClicks((c) => c + 1)}
					>
						{contentMode !== "icon" ? "Label" : undefined}
					</OreButton>
					<OreButton color="general" size={size}>
						Tab Next
					</OreButton>
					<OreButton color="realms" size={size}>
						Tab Third
					</OreButton>
				</div>
				<p className="text-xs text-[#888888] m-0">
					Click any control above then press <kbd className="px-1.5 py-0.5 bg-[#292929] border border-[#404040] text-white">Tab</kbd> to move the white focus ring across buttons.
				</p>
			</div>
		</div>
	);
}

export function ButtonStateMatrix() {
	return (
		<div className="my-6 overflow-x-auto bg-[#1e1e1f] border border-[#3a3a3a] p-4">
			<div className="min-w-[680px] flex flex-col gap-3">
				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 text-xs font-block text-[#a3a3a3] pb-2 border-b border-[#333333]">
					<div>State</div>
					{COLORS.map((c) => (
						<div key={c.id} className="text-center text-white">
							{c.label}
						</div>
					))}
				</div>

				{STATES.map((st) => (
					<div key={st.id} className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
						<div className="text-xs font-sans text-[#a3a3a3]">{st.label}</div>
						{COLORS.map((c) => (
							<div key={c.id} className="flex justify-center">
								<OreButton
									color={c.id}
									forceState={st.id}
									size="sm"
									fullWidth
								>
									Label
								</OreButton>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export function ButtonContentMatrix() {
	return (
		<div className="my-6 overflow-x-auto bg-[#1e1e1f] border border-[#3a3a3a] p-4">
			<div className="min-w-[680px] flex flex-col gap-4">
				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 text-xs font-block text-[#a3a3a3] pb-2 border-b border-[#333333]">
					<div>Layout</div>
					{COLORS.map((c) => (
						<div key={c.id} className="text-center text-white">
							{c.label}
						</div>
					))}
				</div>

				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
					<div className="text-xs font-sans text-[#a3a3a3]">Text</div>
					{COLORS.map((c) => (
						<OreButton key={c.id} color={c.id} size="sm" fullWidth>
							Label
						</OreButton>
					))}
				</div>

				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
					<div className="text-xs font-sans text-[#a3a3a3]">Text & Icon</div>
					{COLORS.map((c) => (
						<OreButton key={c.id} color={c.id} size="sm" icon={<PixelPlayIcon />} fullWidth>
							Label
						</OreButton>
					))}
				</div>

				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
					<div className="text-xs font-sans text-[#a3a3a3]">Icon Only</div>
					{COLORS.map((c) => (
						<OreButton
							key={c.id}
							color={c.id}
							size="sm"
							icon={<PixelPlayIcon />}
							aria-label={`${c.label} icon button`}
							fullWidth
						/>
					))}
				</div>

				<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
					<div className="text-xs font-sans text-[#a3a3a3]">Vertical</div>
					{COLORS.map((c) => (
						<OreButton
							key={c.id}
							color={c.id}
							size="sm"
							orientation="vertical"
							icon={<PixelPlayIcon />}
							fullWidth
						>
							Label
						</OreButton>
					))}
				</div>
			</div>
		</div>
	);
}
