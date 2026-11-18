import React, { useState } from "react";
import {
	OreCheckbox,
	OreRadio,
	OreSearchBox,
	OreSwitch,
	OreTextbox,
	type OreCheckboxColor,
	type OreRadioColor,
	type OreSwitchColor,
} from "../ore-ui-react";

const CB_COLORS: Array<{ id: OreCheckboxColor; label: string }> = [
	{ id: "colored", label: "Colored" },
	{ id: "destructive", label: "Destructive" },
	{ id: "warning", label: "Warning" },
	{ id: "realms", label: "Realms" },
];

const SW_COLORS: Array<{ id: OreSwitchColor; label: string }> = [
	{ id: "colored", label: "Colored" },
	{ id: "general", label: "General" },
	{ id: "destructive", label: "Destructive" },
	{ id: "warning", label: "Warning" },
	{ id: "realms", label: "Realms" },
];

export function CheckboxShowcase() {
	const [checked, setChecked] = useState<boolean | "indeterminate">(true);
	const [color, setColor] = useState<OreCheckboxColor>("colored");

	const cycle = () => {
		setChecked((prev) => (prev === false ? true : prev === true ? "indeterminate" : false));
	};

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="flex flex-wrap gap-2">
					{CB_COLORS.map((c) => (
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
					<button
						type="button"
						onClick={cycle}
						className="px-3 py-1.5 text-xs font-block border bg-[#292929] border-[#404040] text-white cursor-pointer"
					>
						Cycle (false → true → indeterminate)
					</button>
				</div>
				<div className="flex flex-wrap items-center gap-6 p-4 bg-[#141415] border border-[#2c2c2e]">
					<OreCheckbox
						color={color}
						checked={checked}
						onChange={setChecked}
						label={`State: ${String(checked)}`}
					/>
					<OreCheckbox color={color} checked={false} label="Unchecked" onChange={() => {}} />
					<OreCheckbox color={color} checked="indeterminate" label="Indeterminate" onChange={() => {}} />
					<OreCheckbox color={color} checked={true} disabled label="Disabled" />
				</div>
			</div>

			<div className="overflow-x-auto bg-[#1e1e1f] border border-[#3a3a3a] p-4">
				<div className="min-w-[520px] flex flex-col gap-3">
					<div className="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 text-xs font-block text-[#a3a3a3] pb-2 border-b border-[#333333]">
						<div>State</div>
						{CB_COLORS.map((c) => (
							<div key={c.id} className="text-center text-white">
								{c.label}
							</div>
						))}
					</div>
					{(
						[
							["Checked", true, "default"],
							["Checked Hover", true, "hover"],
							["Checked Focus", true, "focus"],
							["Indeterminate", "indeterminate", "default"],
							["Unchecked", false, "default"],
							["Disabled", true, "disabled"],
						] as const
					).map(([label, val, st]) => (
						<div key={label} className="grid grid-cols-[120px_repeat(4,minmax(0,1fr))] gap-2 items-center">
							<div className="text-xs font-sans text-[#a3a3a3]">{label}</div>
							{CB_COLORS.map((c) => (
								<div key={c.id} className="flex justify-center">
									<OreCheckbox color={c.id} checked={val} forceState={st} aria-label={`${c.label} ${label}`} />
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function SwitchShowcase() {
	const [on, setOn] = useState(true);
	const [hasIcon, setHasIcon] = useState(true);

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#d4d4d8]">
					<label className="flex items-center gap-2 cursor-pointer">
						<input type="checkbox" checked={hasIcon} onChange={(e) => setHasIcon(e.target.checked)} />
						<span>hasIcon (I / O track symbols)</span>
					</label>
					<span className="text-[#888888]">Click or press Space/Enter while focused with Tab</span>
				</div>
				<div className="flex flex-wrap items-center gap-6 p-4 bg-[#141415] border border-[#2c2c2e]">
					{SW_COLORS.map((c) => (
						<div key={c.id} className="flex flex-col items-center gap-2">
							<OreSwitch
								color={c.id}
								checked={on}
								hasIcon={hasIcon}
								onChange={setOn}
								aria-label={`${c.label} switch`}
							/>
							<span className="text-xs text-[#a3a3a3]">{c.label}</span>
						</div>
					))}
				</div>
			</div>

			<div className="overflow-x-auto bg-[#1e1e1f] border border-[#3a3a3a] p-4">
				<div className="min-w-[600px] flex flex-col gap-3">
					<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 text-xs font-block text-[#a3a3a3] pb-2 border-b border-[#333333]">
						<div>State</div>
						{SW_COLORS.map((c) => (
							<div key={c.id} className="text-center text-white">
								{c.label}
							</div>
						))}
					</div>
					{(
						[
							["On (Default)", true, "default"],
							["On (Hover)", true, "hover"],
							["On (Focused)", true, "focus"],
							["Off (Default)", false, "default"],
							["Off (Focused)", false, "focus"],
							["Disabled", true, "disabled"],
						] as const
					).map(([label, val, st]) => (
						<div key={label} className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
							<div className="text-xs font-sans text-[#a3a3a3]">{label}</div>
							{SW_COLORS.map((c) => (
								<div key={c.id} className="flex justify-center">
									<OreSwitch
										color={c.id}
										checked={val}
										hasIcon={hasIcon}
										forceState={st}
										aria-label={`${c.label} ${label}`}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const RD_COLORS: Array<{ id: OreRadioColor; label: string }> = [
	{ id: "colored", label: "Colored" },
	{ id: "general", label: "General" },
	{ id: "destructive", label: "Destructive" },
	{ id: "warning", label: "Warning" },
	{ id: "realms", label: "Realms" },
];

export function RadioShowcase() {
	const [selected, setSelected] = useState<OreRadioColor>("colored");

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-wrap items-center gap-6" role="radiogroup" aria-label="Ore Radio Demo">
				{RD_COLORS.map((c) => (
					<OreRadio
						key={c.id}
						color={c.id}
						checked={selected === c.id}
						onChange={() => setSelected(c.id)}
						label={c.label}
					/>
				))}
				<OreRadio color="colored" checked={true} disabled label="Disabled" />
			</div>

			<div className="overflow-x-auto bg-[#1e1e1f] border border-[#3a3a3a] p-4">
				<div className="min-w-[600px] flex flex-col gap-3">
					<div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 text-xs font-block text-[#a3a3a3] pb-2 border-b border-[#333333]">
						<div>State</div>
						{RD_COLORS.map((c) => (
							<div key={c.id} className="text-center text-white">
								{c.label}
							</div>
						))}
					</div>
					{(
						[
							["On (Default)", true, "default"],
							["On (Hover)", true, "hover"],
							["On (Focused)", true, "focus"],
							["Off (Default)", false, "default"],
							["Disabled", true, "disabled"],
						] as const
					).map(([label, val, st]) => (
						<div key={label} className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-2 items-center">
							<div className="text-xs font-sans text-[#a3a3a3]">{label}</div>
							{RD_COLORS.map((c) => (
								<div key={c.id} className="flex justify-center">
									<OreRadio color={c.id} checked={val} forceState={st} aria-label={`${c.label} ${label}`} />
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function TextInputsShowcase() {
	const [text, setText] = useState("");
	const [query, setQuery] = useState("");
	const [invalid, setInvalid] = useState(false);

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
			<label className="flex items-center gap-2 text-xs font-sans text-[#d4d4d8] cursor-pointer">
				<input type="checkbox" checked={invalid} onChange={(e) => setInvalid(e.target.checked)} />
				<span>invalid (Error state)</span>
			</label>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-xs font-sans text-[#a3a3a3]">OreTextbox</span>
					<OreTextbox
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter world name..."
						invalid={invalid}
					/>
					<OreTextbox value="Disabled value" disabled invalid={invalid} readOnly />
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-xs font-sans text-[#a3a3a3]">OreSearchBox</span>
					<OreSearchBox
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onClear={() => setQuery("")}
						placeholder="Search packs..."
						invalid={invalid}
					/>
					<OreSearchBox value="Disabled search" disabled invalid={invalid} readOnly />
				</div>
			</div>
		</div>
	);
}
