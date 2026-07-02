import { createFileRoute } from "@tanstack/react-router";
import { Header } from "#/components/commons/header.tsx"
import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export const Route = createFileRoute("/")({
	component: TrangChu,
});

function TrangChu() {
	const [isRolling, setIsRolling] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsRolling(true);
			} else {
				setIsRolling(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<Box height="1000vh">
			<Header isRolling={isRolling}/>
		</Box>
	)
}
