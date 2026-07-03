"use client";

import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import { SwitchLanguageButton } from "#/components/ui/switch-language-button";
import { SearchButton } from "#/components/ui/search-button";
import { LogoCloud } from "#/components/ui/logo-cloud";
import { LogoText } from "#/components/ui/logo-text";

const CATEGORY_MAP: Record<string, string> = {
	"bao-tang": "Bảo Tàng",
	"lang-nghe": "Làng Nghề Truyền Thống",
	"tam-guong-tre": "Tấm Gương Trẻ",
	"thoi-hoa-lua": "Thời Hoa Lửa",
};

interface SlugHeaderProps {
	categoryName: string;
	postTitle?: string;
	coverImageUrl?: string;
	isScrolled: boolean;
}

export function SlugHeader({ categoryName, postTitle, coverImageUrl, isScrolled }: SlugHeaderProps) {
	const displayCategoryTitle = CATEGORY_MAP[categoryName] || categoryName;

	return (
		<Box
			position="fixed"
			top={0}
			zIndex={100}
			w="full"
			bg={isScrolled ? `url('${coverImageUrl}')` : "rgba(255, 255, 255, 0.45)"}
			backgroundSize="cover"
			backgroundPosition="top center"
			backdropFilter={isScrolled ? "none" : "blur(1.5px) saturate(110%)"}
			boxShadow="0 8px 24px -4px rgba(0, 0, 0, 0.5)"
			pb={0}
			transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
			h={isScrolled ? "110px" : "auto"}
			overflow="hidden"
		>
			<Box position="absolute" top={3} left={4} zIndex={10}>
				<HStack gap={3} alignItems="center">
					<SwitchLanguageButton color="#641615"/>
					<Text fontSize="3xl" fontWeight="200" color="#641615" mt="-2px">|</Text>
					<SearchButton color="#641615"/>
				</HStack>
			</Box>

			<Box
				position="absolute"
				top={3}
				right={6}
				zIndex={10}
				w="max-content"
				opacity={1}
				pointerEvents="auto"
				transform="scale(0.4)"
				transformOrigin="top right"
				transition="all 0.4s ease"
			>
				<LogoText color="#641615"/>
			</Box>

			<Flex
				direction="column"
				align="center"
				justify="center"
				w="full"
				h="full"
				pt={isScrolled ? 0 : { base: "50px", md: 3 }}
				position="relative"
			>
				<Box
					opacity={isScrolled ? 0 : 1}
					transform={isScrolled ? "translateY(-20px) scale(0.8)" : "translateY(0) scale(1)"}
					position={isScrolled ? "absolute" : "relative"}
					pointerEvents={isScrolled ? "none" : "auto"}
					transition="all 0.4s ease"
				>
					<LogoCloud />
				</Box>

				<Box
					position="absolute"
					top={16}
					right={6}
					opacity={isScrolled ? 1 : 0}
					transform={isScrolled ? "scale(0.6)" : "scale(0)"}
					transformOrigin="top right"
					pointerEvents={isScrolled ? "auto" : "none"}
					transition="all 0.4s ease"
				>
					<LogoCloud />
				</Box>

				<Text
					color="#641615"
					fontSize={{ base: "2sm", sm: "2md", md: "2lg", lg: "2xl" }}
					fontWeight="bold"
					fontFamily="quicksand"
					textTransform="uppercase"
					textDecoration="underline"
					textUnderlineOffset="6px"
					textDecorationThickness="2px"
					letterSpacing="wide"
					lineHeight="1"
					pb="6px"
					mb="-1px"
					transition="all 0.4s ease"
					mt={isScrolled ? 2 : 7}
				>
					{displayCategoryTitle}
				</Text>

				<Text
					opacity={isScrolled ? 1 : 0}
					transform={isScrolled ? "translateY(0)" : "translateY(20px)"}
					color="#641615"
					fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
					fontWeight="bold"
					position={isScrolled ? "relative" : "absolute"}
					pointerEvents={isScrolled ? "auto" : "none"}
					transition="all 0.4s ease"
					mt={2}
				>
					{postTitle}
				</Text>
			</Flex>
		</Box>
	);
}