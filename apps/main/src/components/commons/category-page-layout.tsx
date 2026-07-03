"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { Header } from "#/components/commons/header";
import { PostCarousel } from "#/components/commons/post-carousel";
import { AutoScrollCarousel } from "#/components/commons/scroll-carousel.tsx";
import type { Post } from "#/utils/data-fetching";

interface CategoryPageLayoutProps {
	posts: Post[];
}

export function CategoryPageLayout({ posts }: CategoryPageLayoutProps) {
	const latestThreePosts = posts.slice(0, 3);

	const [isRolling, setIsRolling] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsRolling(!entry.isIntersecting);
			},
			{ root: null, threshold: 0 }
		);

		observer.observe(sentinel);
		return () => observer.unobserve(sentinel);
	}, []);

	return (
		<Box h="1000px" position="relative">
			<div
				ref={sentinelRef}
				style={{
					position: "absolute",
					top: "0px", left: "0px", width: "100%", height: "10px",
					pointerEvents: "none", zIndex: 9999
				}}
			/>

			<Header isRolling={isRolling} />

			<Box w="full">
				<Box mb={12}>
					<PostCarousel posts={latestThreePosts} />
				</Box>

				<VStack gap={10} w="full" align="stretch">
					{posts.length > 0 && <AutoScrollCarousel posts={posts} />}
				</VStack>
			</Box>
		</Box>
	);
}