"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Box, Flex, Text, Image, Link as ChakraLink } from "@chakra-ui/react"; // Đổi tên Link thành ChakraLink
import { Link as RouterLink } from "@tanstack/react-router"; // Thêm RouterLink của TanStack
import type { Post } from "#/utils/data-fetching";
import { useTranslation } from "react-i18next";

interface AutoScrollCarouselProps {
	posts: Post[];
}

export function AutoScrollCarousel({ posts }: AutoScrollCarouselProps) {
	const { t } = useTranslation();

	const [emblaRef] = useEmblaCarousel(
		{ loop: true, dragFree: true },
		[
			AutoScroll({
				speed: 1,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
			}),
		]
	);

	if (!posts || posts.length === 0) return null;

	return (
		<Box ref={emblaRef} overflow="hidden" w="full" py={3}>
			<Flex display="flex" className="embla__container" alignItems="stretch">

				<Box
					className="embla__slide"
					flex="0 0 auto"
					minW={0}
					w={{ base: "140px", md: "180px" }}
					mr={6}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Image
						src="/whiteStamp.png"
						alt="Tự Hào Sử Việt"
						objectFit="contain"
						w="full"
					/>
				</Box>

				{posts.map((post) => (
					<ChakraLink
						key={post._id}
						asChild
						variant="plain"
						className="embla__slide"
						flex="0 0 auto"
						minW={0}
						w={{ base: "480px", md: "580px" }}
						mr={6}
						bg="white"
						borderRadius="2xl"
						overflow="hidden"
						shadow="sm"
						_hover={{ transform: "translateY(-4px)", boxShadow: "lg", textDecoration: "none" }}
						transition="all 0.3s ease"
					>
						<RouterLink to="/$slug" params={{ slug: post.slug }}>
							<Flex gap={3} h="180px" alignItems="stretch" p={4}>

								<Box
									flex="0 0 50%"
									h="full"
									borderRadius="xl"
									overflow="hidden"
									position="relative"
								>
									<Image
										src={post.coverPhoto?.url}
										alt={post.title}
										w="full"
										h="full"
										objectFit="cover"
									/>
									<Box
										position="absolute"
										bottom={0}
										left={0}
										right={0}
										bg="blackAlpha.700"
										px={2}
										py={2}
									>
										<Text
											color="white"
											fontWeight="bold"
											fontSize="md"
											lineClamp={1}
										>
											{post.title}
										</Text>
									</Box>
								</Box>

								<Flex
									direction="column"
									flex="1"
									h="full"
									justifyContent="center"
									bg="red.50"
									borderRadius="xl"
									p={4}
								>
									<Text
										color="red.900"
										fontWeight="bold"
										fontSize="lg"
										textAlign="center"
										mb={2}
									>
										{t("app.summarize")}
									</Text>

									<Text
										color="gray.700"
										fontSize="sm"
										lineHeight="tall"
										lineClamp={4}
										textAlign="justify"
									>
										{post.excerpt}
									</Text>
								</Flex>

							</Flex>
						</RouterLink>
					</ChakraLink>
				))}
			</Flex>
		</Box>
	);
}