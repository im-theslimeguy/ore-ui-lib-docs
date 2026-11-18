import React, { useState } from "react";
import {
	OreButton,
	OreMenuButton,
	OreMenuGroup,
	OrePopup,
	OrePopupActions,
	OrePopupContent,
	OrePopupHeader,
	OreSeamlessButton,
} from "../ore-ui-react";

function PixelChevronLeft() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M7 2H9V4H7V2ZM5 4H7V5H5V4ZM3 5H5V7H3V5ZM5 7H7V8H5V7ZM7 8H9V10H7V8Z" fill="currentColor" />
		</svg>
	);
}

function PixelWarnIcon() {
	return (
		<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path
				d="M5 1H7V3H8V5H9V7H10V9H11V11H1V9H2V7H3V5H4V3H5V1ZM5 4V7H7V4H5ZM5 8V10H7V8H5Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function SeamlessButtonShowcase() {
	return (
		<div className="my-6 flex flex-col gap-5">
			<div className="p-5 bg-[#d0d1d5] border border-[#1e1e1f] flex flex-wrap items-center gap-4">
				<span className="text-xs font-sans text-[#1e1e20] w-full">Light Theme</span>
				<OreSeamlessButton theme="light" icon={<PixelWarnIcon />}>
					Label
				</OreSeamlessButton>
				<OreSeamlessButton theme="light" icon={<PixelChevronLeft />} aria-label="Back" />
				<OreSeamlessButton theme="light">Label</OreSeamlessButton>
			</div>
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-wrap items-center gap-4">
				<span className="text-xs font-sans text-[#a3a3a3] w-full">Dark Theme</span>
				<OreSeamlessButton theme="dark" icon={<PixelWarnIcon />}>
					Label
				</OreSeamlessButton>
				<OreSeamlessButton theme="dark" icon={<PixelChevronLeft />} aria-label="Back" />
				<OreSeamlessButton theme="dark">Label</OreSeamlessButton>
			</div>
		</div>
	);
}

export function MenuButtonShowcase() {
	const [selected, setSelected] = useState("Try selecting this");

	return (
		<div className="my-6 p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
			<div className="text-xs font-sans text-[#a3a3a3]">
				Selected: <strong className="text-white">{selected}</strong>
			</div>
			<div className="max-w-[360px]">
				<OreMenuGroup>
					<OreMenuButton onClick={() => setSelected("Try selecting this")}>
						Try selecting this
					</OreMenuButton>
					<OreMenuButton icon={<PixelWarnIcon />} onClick={() => setSelected("With Icon")}>
						With Icon
					</OreMenuButton>
					<OreMenuButton forceState="hover" onClick={() => setSelected("Hovered Preview")}>
						Hovered State
					</OreMenuButton>
				</OreMenuGroup>
			</div>
		</div>
	);
}

export function PopupShowcase() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-wrap items-center gap-3">
				<OreButton color="colored" onClick={() => setModalOpen(true)}>
					Open Modal Popup
				</OreButton>
				<span className="text-xs font-sans text-[#888888]">
					Click to test live modal backdrop, Escape key, and Seamless close button.
				</span>
			</div>

			<OrePopup modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<OrePopupHeader title="Confirm Action" badge={1} onClose={() => setModalOpen(false)} />
				<OrePopupContent>
					<p className="m-0">
						Your main text goes here. This space should be used to tell the user about the content or actions it&apos;s going to perform.
					</p>
					<p className="m-0 ore-popup-content__secondary">
						Your secondary text can go here to explain the action&apos;s consequences.
					</p>
				</OrePopupContent>
				<OrePopupActions orientation="horizontal">
					<OreButton color="colored" fullWidth onClick={() => setModalOpen(false)}>
						Confirm
					</OreButton>
					<OreButton color="general" fullWidth onClick={() => setModalOpen(false)}>
						Cancel
					</OreButton>
				</OrePopupActions>
			</OrePopup>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
				<OrePopup>
					<OrePopupHeader title="Action Popup" onClose={() => {}} />
					<OrePopupContent>
						<p className="m-0">
							Your main text goes here. This space should be used to tell the user about the content or actions it&apos;s going to perform.
						</p>
						<p className="m-0 ore-popup-content__secondary">
							Your secondary text can go here.
						</p>
						<p className="m-0 ore-popup-content__tertiary">
							And you can also put a tertiary text here.
						</p>
					</OrePopupContent>
					<OrePopupActions orientation="vertical">
						<OreButton color="colored" fullWidth>
							Primary Action
						</OreButton>
						<OreButton color="general" fullWidth>
							Cancel
						</OreButton>
					</OrePopupActions>
				</OrePopup>

				<OrePopup>
					<OrePopupHeader title="Menu Popup" badge={3} onClose={() => {}} />
					<div className="ore-popup-menu">
						<OreMenuButton>Try selecting this</OreMenuButton>
						<OreMenuButton icon={<PixelWarnIcon />}>Maybe this?</OreMenuButton>
						<OreMenuButton>Or this!</OreMenuButton>
					</div>
					<OrePopupActions orientation="horizontal">
						<OreButton color="colored" fullWidth>
							Save
						</OreButton>
						<OreButton color="general" fullWidth>
							Back
						</OreButton>
					</OrePopupActions>
				</OrePopup>
			</div>
		</div>
	);
}
