import { Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function LogoText() {
	const { t } = useTranslation();

	return (
		<Link
			to="/about-us"
			style={{ textDecoration: "none" }}
		>
			<Text
				as="h1"
				color="#ffffff"
				fontWeight="bold"
				fontFamily="quicksand"
				whiteSpace="nowrap"
				fontSize={{ base: "4xl", sm: "5xl", md: "8xl", lg: "10xl" }}
				transition="all 0.5s ease-in-out"
			>
				{t("app.title")}
			</Text>
		</Link>
	);
}