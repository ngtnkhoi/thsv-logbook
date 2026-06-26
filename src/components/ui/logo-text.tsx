import { Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export function LogoText({ isRolling = false }: { isRolling?: boolean }) {
	return (
		<Link
			to="/"
			style={{ textDecoration: "none" }}
		>
			<Text
				as="h1"
				color="#8A2626"
				fontWeight="bold"
				whiteSpace="nowrap"
				fontSize={
					isRolling
						? { base: "xl", md: "2xl" }
						: { base: "4xl", md: "5xl", lg: "6xl" }
				}
				transition="all 0.5s ease-in-out"
			>
				SÀI GÒN UNFOLDED
			</Text>
		</Link>
	);
}