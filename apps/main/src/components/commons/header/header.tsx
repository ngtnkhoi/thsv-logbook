"use client";

import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { SwitchLanguageButton } from "#/components/ui/switch-language-button";
import { SearchButton } from "#/components/ui/search-button";
import { LogoCloud } from "#/components/ui/logo-cloud";
import { LogoText } from "#/components/ui/logo-text";
import { NavigationBar } from "#/components/ui/navigation-bar";
import { HEADER_STYLES } from "./header-config";
import { useMemo } from "react";
import { useHeaderScroll } from "#/components/commons/header/use-header-scroll";

export function Header() {
	const { isRolling, sentinelRef } = useHeaderScroll();

	const staticUI = useMemo(() => ({
		leftGroup: (
			<HStack gap={3} alignItems="center">
				<SwitchLanguageButton color="#ffffff"/>
				<Text
					fontSize="3xl"
					fontWeight="200"
					color="whiteAlpha.600"
					mt="-2px"
				>
					|
				</Text>
				<SearchButton color="#ffffff"/>
			</HStack>
		),
		navBar: <NavigationBar />,
		logoText: <LogoText color="#ffffff"/>
	}), []);

	return (
		<>
			<Box
				ref={sentinelRef}
				position="absolute"
				top="0px"
				left="0px"
				w="100%"
				h="10px"
				pointerEvents="none"
				zIndex={9999}
			/>
			<Box {...HEADER_STYLES.wrapper} data-scrolled={isRolling}>

				<Box {...HEADER_STYLES.leftActions}>
					{staticUI.leftGroup}
				</Box>

				<Box {...HEADER_STYLES.rightLogo}>
					{staticUI.logoText}
				</Box>

				<VStack {...HEADER_STYLES.centerStack}>
					<LogoCloud />
					<Box {...HEADER_STYLES.logoTextWrapper}>
						{staticUI.logoText}
					</Box>
				</VStack>

				{staticUI.navBar}
			</Box>
		</>
	);
}