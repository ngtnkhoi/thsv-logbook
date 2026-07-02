"use client";

import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { SwitchLanguageButton } from "#/components/ui/switch-language-button";
import { SearchButton } from "#/components/ui/search-button";
import { LogoCloud } from "#/components/ui/logo-cloud";
import { LogoText } from "#/components/ui/logo-text";
import { NavigationBar } from "#/components/ui/navigation-bar";

interface HeaderProps {
	isRolling?: boolean;
}

export function Header({ isRolling = false }: HeaderProps) {
	return (
		<Box
			position="sticky"
			top={0}
			zIndex={100}
			w="full"
			backgroundImage="url('/buu-dien.jpg')"
			backgroundSize="cover"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			backgroundBlendMode="multiply"
			transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
		>
			<Box
				position="absolute"
				top={3}
				left={4}
				zIndex={10}
			>
				<HStack gap={3} alignItems="center">
					<SwitchLanguageButton />
					<Text fontSize="3xl" fontWeight="200" color="whiteAlpha.600" mt="-2px">
						|
					</Text>
					<SearchButton />
				</HStack>
			</Box>

			<Box
				position="absolute"
				top={3}
				right={6}
				zIndex={10}
				w="max-content"
				opacity={isRolling ? 1 : 0}
				pointerEvents={isRolling ? "auto" : "none"}

				transform="scale(0.4)"
				transformOrigin="top right"

				transition="opacity 0.25s ease-in-out"
			>
				<LogoText />
			</Box>

			<VStack
				pt={{ base: "50px", md: 3 }}
				pb={isRolling ? 6 : 0}
				gap={0}
				justify="flex-start"
				transition="padding 0.4s ease-in-out"
			>
				<LogoCloud />

				<Box
					opacity={isRolling ? 0 : 1}
					maxH={isRolling ? 0 : "150px"}
					overflow="hidden"
					transition="opacity 0.2s ease-in-out, max-height 0.35s ease-in-out"
				>
					<LogoText />
				</Box>
			</VStack>

			<NavigationBar />
		</Box>
	);
}