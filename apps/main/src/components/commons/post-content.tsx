"use client";

import { Box, Flex, Text, AspectRatio } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import type { ContentBlock } from "#/utils/data-fetching";
import { useMemo } from "react";

interface PostContentBlocksProps {
	blocks: ContentBlock[];
}

const extractFirstSentence = (text: string) => {
	if (!text) return { firstSentence: "", restOfText: "" };
	const match = text.match(/[.!?](\s|$|\n)/);
	if (match && match.index !== undefined) {
		const splitPoint = match.index + 1;
		return { firstSentence: text.slice(0, splitPoint).trim(), restOfText: text.slice(splitPoint) };
	}
	const newlineIndex = text.indexOf("\n");
	if (newlineIndex !== -1) {
		return { firstSentence: text.slice(0, newlineIndex).trim(), restOfText: text.slice(newlineIndex) };
	}
	return { firstSentence: text, restOfText: "" };
};

export function PostContent({ blocks }: PostContentBlocksProps) {
	const { videoUI, imageUI } = useMemo(() => {
		if (!blocks || blocks.length === 0) return { videoUI: null, imageUI: null };

		const videoBlocks = blocks.filter((block) => block.mediaType === "video");
		const imageBlocks = blocks.filter((block) => block.mediaType === "image");

		const videoUI = videoBlocks.length > 0 ? (
			<Flex direction="column" gap={12}>
				{videoBlocks.map((block) => (
					<Flex
						key={block._key}
						direction={{ base: "column", lg: "row" }}
						minH="100vh"
						w="full"
						align="center"
						px={{ base: 4, md: 10, xl: 20 }}
						gap={{ base: 8, lg: 16 }}
					>
						<Box flex={{ base: 1, lg: 1.5 }} w="full">
							{block.videoUrl && (
								<AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden" boxShadow="2xl">
									<video controls style={{ objectFit: "cover" }}>
										<source src={block.videoUrl} type="video/mp4" />
										Trình duyệt của bạn không hỗ trợ thẻ video.
									</video>
								</AspectRatio>
							)}
						</Box>
						<Flex flex={1} align="center">
							<Text color="#ffffff" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} fontFamily="montserrat" lineHeight="tall" whiteSpace="pre-wrap">
								{block.text}
							</Text>
						</Flex>
					</Flex>
				))}
			</Flex>
		) : null;

		const imageUI = imageBlocks.length > 0 ? (
			<Flex direction="column" gap={{ base: 8, md: 16 }}>
				{imageBlocks.map((block, index) => {
					const isEven = index % 2 === 0;
					const { firstSentence, restOfText } = extractFirstSentence(block.text || "");

					return (
						<Flex
							key={block._key}
							direction={{ base: "column", md: isEven ? "row" : "row-reverse" }}
							w="full"
							minH={{ base: "auto", md: "600px" }}
							gap={{ base: 6, md: 12, lg: 20 }}
							px={{ base: 0, md: 8, xl: 16 }}
						>
							<Flex flex={1} align="center" justify="center" p={{ base: 8, md: 4 }}>
								<Text color="#ffffff" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} fontFamily="montserrat" fontWeight="500" textAlign={{ base: "center", md: isEven ? "right" : "left" }} lineHeight="tall" whiteSpace="pre-wrap" w="full">
									{firstSentence && <Box as="span" fontWeight="bold">{firstSentence}</Box>}
									{restOfText}
								</Text>
							</Flex>

							<Box flex={1.2} position="relative" minH={{ base: "400px", md: "auto" }} borderRadius={{ base: "none", md: isEven ? "2xl 0 0 2xl" : "0 2xl 2xl 0" }} overflow="hidden" boxShadow="xl">
								{block.image?.url && (
									<chakra.img src={block.image.url} alt="Content image" w="full" h="full" objectFit="cover" />
								)}
							</Box>
						</Flex>
					);
				})}
			</Flex>
		) : null;

		return { videoUI, imageUI };
	}, [blocks]);

	if (!blocks || blocks.length === 0) return null;

	return (
		<Box w="full" py={12}>
			<Flex w="full" direction="column" gap={16}>
				{videoUI}
				{imageUI}
			</Flex>
		</Box>
	);
}