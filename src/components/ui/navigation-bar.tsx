import { Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { navigationItems } from "@/constants/app";

const navLinks = [
	{ label: navigationItems[0], path: "/" },
	{ label: navigationItems[1], path: "/bao-tang" },
	{ label: navigationItems[2], path: "/lang-nghe" },
	{ label: navigationItems[3], path: "/tam-guong" },
	{ label: navigationItems[4], path: "/hoa-lua" },
];

export function NavigationBar() {
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
				justify="space-between"
				px={{ base: 4, md: 8 }}
				py="4px"
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
							fontSize={{ base: "sm", md: "md", lg: "lg" }}
							fontWeight="semibold"
							pb="0px"
							_hover={{ color: "red.800" }}
							transition="all 0.15s ease"
						>
							{item.label}
						</Text>
					</Link>
				))}
			</HStack>
		</Box>
	);
}