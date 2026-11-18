import React, { useState } from "react";
import { OreNavbar, OreNavGroup, OreNavItem } from "../ore-ui-react";

function PlaceholderSquare() {
	return <span style={{ display: "block", width: "100%", height: "100%", background: "#b1b2b5" }} />;
}

export function NavbarShowcase() {
	const [active, setActive] = useState("worlds");

	return (
		<div className="my-6 flex flex-col gap-6">
			<div className="p-5 bg-[#1e1e1f] border border-[#3a3a3a] flex flex-col gap-4">
				<div className="text-xs font-sans text-[#a3a3a3]">
					Active item: <strong className="text-white">{active}</strong> — Press{" "}
					<kbd className="px-1.5 py-0.5 bg-[#292929] border border-[#404040] text-white">Tab</kbd> to focus
					both clickable items and the non-clickable <code className="text-[#56b842]">header</code>.
				</div>
				<div className="max-w-[320px] border border-[#1d1e1f]">
					<OreNavbar size="md" aria-label="Minecraft Navigation">
						<OreNavGroup>
							<OreNavItem
								icon={<PlaceholderSquare />}
								badge={1}
								selected={active === "home"}
								onClick={() => setActive("home")}
							>
								Home
							</OreNavItem>
							<OreNavItem
								icon={<PlaceholderSquare />}
								badge={3}
								selected={active === "worlds"}
								onClick={() => setActive("worlds")}
							>
								Worlds
							</OreNavItem>
						</OreNavGroup>
						<OreNavGroup>
							<OreNavItem type="header" icon={<PlaceholderSquare />} badge={2}>
								Settings
							</OreNavItem>
							<OreNavItem
								icon={<PlaceholderSquare />}
								selected={active === "video"}
								onClick={() => setActive("video")}
							>
								Video
							</OreNavItem>
							<OreNavItem
								icon={<PlaceholderSquare />}
								badge={1}
								selected={active === "audio"}
								onClick={() => setActive("audio")}
							>
								Audio
							</OreNavItem>
						</OreNavGroup>
					</OreNavbar>
				</div>
			</div>
		</div>
	);
}
