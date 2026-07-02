import { Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const NAV_PATHS = [
	"/",
	"/bao-tang",
	"/lang-nghe",
	"/tam-guong",
	"/hoa-lua",
];

export function NavigationBar() {
	const { t } = useTranslation();
	const navLabels = t("app.navigationItems", { returnObjects: true }) as string[];

	const navLinks = NAV_PATHS.map((path, index) => ({
		label: navLabels[index],
		path: path,
	}));

	return (
		<Box
			w="full"
			bg="#FCEDC9"
			borderY="1px solid"
			borderColor="blackAlpha.200"
		>
			<HStack
				maxW="6xl"
				mx="auto"
				justify={{ base: "center", md: "space-between" }}
				px={{ base: 4, md: 8 }}
				py={{ base: "10px", md: "4px" }}

				wrap={{ base: "wrap", md: "nowrap" }}
				gap={{ base: "16px", md: 0 }}
				rowGap={{ base: "8px", md: 0 }}
			>
				{navLinks.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						style={{ textDecoration: "none" }}
						activeProps={{
							style: {
								borderBottom: "3px solid #5A1F1F",
								fontWeight: "700",
							},
						}}
					>
						<Text
							color="#80292A"
							fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
							fontWeight="bold"
							fontFamily="quicksand"
							pb="2px"
							_hover={{ color: "red.800" }}
							transition="all 0.15s ease"
							whiteSpace="nowrap"
						>
							{item.label}
						</Text>
					</Link>
				))}
			</HStack>
		</Box>
	);
}