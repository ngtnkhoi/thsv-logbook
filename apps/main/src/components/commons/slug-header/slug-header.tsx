"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { SwitchLanguageButton } from "#/components/ui/switch-language-button";
import { SearchButton } from "#/components/ui/search-button";
import { LogoCloud } from "#/components/ui/logo-cloud";
import { LogoText } from "#/components/ui/logo-text";
import { useMemo } from "react";
import { useHeroScroll } from "#/utils/use-post-scroll";
import { SLUG_HEADER_STYLES } from "./slug-header-config";

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
}

export function SlugHeader({ categoryName, postTitle, coverImageUrl }: SlugHeaderProps) {
	const isScrolled = useHeroScroll();
	const displayCategoryTitle = CATEGORY_MAP[categoryName] || categoryName;

	const staticUI = useMemo(() => ({
		leftGroup: (
			<HStack gap={3} alignItems="center">
				<SwitchLanguageButton color="#641615" />
				<Text fontSize="3xl" fontWeight="200" color="#641615" mt="-2px">
					|
				</Text>
				<SearchButton color="#641615" />
			</HStack>
		),
		logoText: <LogoText color="#641615" />,
		logoCloud: <LogoCloud />,
	}), []);

	return (
		<Box
			{...SLUG_HEADER_STYLES.wrapper}
			data-scrolled={isScrolled}
			bg={isScrolled ? `url('${coverImageUrl}')` : SLUG_HEADER_STYLES.wrapper.bg}
		>
			<Box {...SLUG_HEADER_STYLES.leftActions}>
				{staticUI.leftGroup}
			</Box>

			<Box {...SLUG_HEADER_STYLES.rightLogo}>
				{staticUI.logoText}
			</Box>

			<Box {...SLUG_HEADER_STYLES.centerFlex}>
				<Box {...SLUG_HEADER_STYLES.mainLogoWrapper}>
					{staticUI.logoCloud}
				</Box>

				<Box {...SLUG_HEADER_STYLES.scrolledLogoWrapper}>
					{staticUI.logoCloud}
				</Box>

				<Text {...SLUG_HEADER_STYLES.categoryTitle}>
					{displayCategoryTitle}
				</Text>

				<Text {...SLUG_HEADER_STYLES.postTitle}>
					{postTitle}
				</Text>
			</Box>
		</Box>
	);
}