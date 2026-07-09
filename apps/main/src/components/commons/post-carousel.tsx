"use client";

import { useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Box, Flex, Text, Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useCarouselButtons } from "#/utils/carousel";
import type { Post } from "#/utils/data-fetching";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface PostCarouselProps {
	posts: Post[];
}

export function PostCarousel({ posts }: PostCarouselProps) {
	const { t } = useTranslation();

	const [selectedIndex, setSelectedIndex] = useState(0);
	const isCarouselActive = posts && posts.length > 1;

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: isCarouselActive, duration: 35, watchDrag: isCarouselActive },
		isCarouselActive ? [Autoplay({ delay: 5000, stopOnLastSnap: false })] : []
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = useCarouselButtons(emblaApi);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		emblaApi.on("init", onSelect);
		emblaApi.on("reInit", onSelect);

		const startAutoplay = () => {
			const autoplay = emblaApi.plugins().autoplay;
			if (autoplay) {
				autoplay.play();
			}
		};

		startAutoplay();

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("init", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, posts]);

	const staticUI = useMemo(() => {
		if (!posts) return { slides: [], summaries: [] };

		return {
			slides: posts.map((post) => (
				<Box
					key={post._id}
					flex="0 0 100%"
					minW={0}
					w="full"
					className="embla__slide"
				>
					<ChakraLink
						asChild
						variant="plain"
						display="block"
						w="full"
						h={{ base: "300px", md: "400px", xl: "650px" }}
						borderRadius="3xl"
						overflow="hidden"
						shadow="2xl"
						borderColor="#80292a"
						borderWidth="2px"
						_hover={{ filter: "brightness(1.03)", transform: "scale(1.005)", textDecoration: "none" }}
						transition="all 0.3s ease"
					>
						<RouterLink to="/$slug" params={{ slug: post.slug }}>
							<Box
								w="full"
								h="full"
								bgImage={`url('${post.coverPhoto?.url}')`}
								bgSize="cover"
								backgroundPosition="center"
								position="relative"
							>
								<Box
									position="absolute"
									bottom={6}
									left={{ base: 4, md: 8 }}
									right={{ base: 4, md: 8 }}
									zIndex={2}
									bg="linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(245, 245, 245, 0.55) 100%)"
									backdropFilter="blur(24px) saturate(140%)"
									borderRadius="2xl"
									p={4}
									textAlign="center"
									boxShadow="inset 0 0 0 1px rgba(255, 255, 255, 0.35), 0 8px 32px 0 rgba(0, 0, 0, 0.12)"
								>
									<Text
										fontSize={{ base: "15px", md: "2xl", lg: "3xl", xl: "5xl" }}
										color="#5A1F1F"
										fontWeight="900"
										fontFamily="quicksand"
										textTransform="uppercase"
										lineHeight="1.2"
										lineClamp={1}
									>
										{post.title}
									</Text>
								</Box>
							</Box>
						</RouterLink>
					</ChakraLink>
				</Box>
			)),

			summaries: posts.map((post) => (
				<>
					<Text
						fontSize={{ base: "xl", md: "2xl", xl: "7xl" }}
						fontFamily="quicksand"
						fontWeight="900"
						textTransform="uppercase"
						color="#5A1F1F"
						textAlign="center"
						mb={2}
						mt={0}
						lineHeight="1"
					>
						{t("app.summarize")}
					</Text>

					<Text
						letterSpacing="tight"
						color="gray.800"
						fontSize="xl"
						fontFamily="montserrat"
						lineHeight="relaxed"
						lineClamp={5}
						textAlign="justify"
					>
						{post.excerpt}
					</Text>
				</>
			))
		};
	}, [posts, t]);

	if (!posts || posts.length === 0) return null;

	return (
		<Box w="full" py={6}>
			<Flex
				direction={{ base: "column", lg: "row" }}
				maxW="1830px"
				mx="auto"
				justifyContent="space-between"
				alignItems="center"
				gap={{ base: 6, lg: 0 }}
			>
				<Box position="relative" w={{ base: "90%", lg: "58%" }}>
					<Box ref={emblaRef} overflow="hidden" w="full" borderRadius="3xl" className="embla__viewport">
						<Flex display="flex" w="full" style={{ touchAction: "pan-y pinch-zoom" }} className="embla__container">
							{staticUI.slides}
						</Flex>
					</Box>

					{isCarouselActive && (
						<>
							<Button
								onClick={onPrevButtonClick}
								disabled={prevBtnDisabled}
								aria-label="Slide trước"
								position="absolute"
								top="50%"
								left={4}
								transform="translateY(-50%)"
								zIndex={10}
								display="flex"
								alignItems="center"
								justifyContent="center"
								color="white"
								variant="ghost"
								p={0}
								minW="auto"
								cursor="pointer"
								transition="all 0.2s"
								_hover={{ bg: "blackAlpha.400" }}
								_disabled={{ opacity: 0.2, cursor: "not-allowed", bg: "transparent" }}
								borderRadius="full"
								w="80px"
								h="80px"
							>
								<LuChevronLeft size="64px" style={{ strokeWidth: "3px" }} />
							</Button>

							<Button
								onClick={onNextButtonClick}
								disabled={nextBtnDisabled}
								aria-label="Slide tiếp theo"
								position="absolute"
								top="50%"
								right={4}
								transform="translateY(-50%)"
								zIndex={10}
								display="flex"
								alignItems="center"
								justifyContent="center"
								color="white"
								variant="ghost"
								p={0}
								minW="auto"
								cursor="pointer"
								transition="all 0.2s"
								_hover={{ bg: "blackAlpha.400" }}
								_disabled={{ opacity: 0.2, cursor: "not-allowed", bg: "transparent" }}
								borderRadius="full"
								w="80px"
								h="80px"
							>
								<LuChevronRight size="64px" style={{ strokeWidth: "3px" }} />
							</Button>
						</>
					)}
				</Box>

				<Box position="relative" w={{ base: "90%", lg: "38%" }} h="300px">
					{posts.map((post, index) => (
						<Flex
							key={`text-${post._id}`}
							direction="column"
							position="absolute"
							top={0}
							left={0}
							w="full"
							h="full"
							p={{ base: 6, md: 8 }}
							pt={{ base: 4, md: 4, xl: 5 }}
							bg="linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(245, 245, 245, 0.55) 100%)"
							backdropFilter="blur(24px) saturate(140%)"
							borderRadius="3xl"
							boxShadow="inset 0 0 0 1px rgba(255, 255, 255, 0.35), 0 8px 32px 0 rgba(0, 0, 0, 0.12)"
							opacity={index === selectedIndex ? 1 : 0}
							visibility={index === selectedIndex ? "visible" : "hidden"}
							zIndex={index === selectedIndex ? 2 : 1}
							transition="opacity 0.6s ease-in-out, visibility 0.6s ease-in-out"
						>
							{staticUI.summaries[index]}
						</Flex>
					))}
				</Box>
			</Flex>
		</Box>
	);
}