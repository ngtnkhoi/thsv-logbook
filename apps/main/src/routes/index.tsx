import { createFileRoute } from "@tanstack/react-router";
import { Header } from "#/components/commons/header";
import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react"; // Thêm useRef
import { getAllPosts } from "#/utils/data-fetching";
import { PostCarousel } from "#/components/commons/post-carousel";
import { AutoScrollCarousel } from "#/components/commons/scroll-carousel.tsx";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";

export const Route = createFileRoute("/")({
	loader: async () => {
		const currentLang = getLangFromCookie();
		return await getAllPosts(currentLang);
	},
	component: TrangChu,
});

function TrangChu() {
	const allPosts = Route.useLoaderData();
	const latestThreePosts = allPosts.slice(0, 3);
	const baoTangPosts = allPosts.filter((post) => post.category?.includes("bao-tang"));
	const langNghePosts = allPosts.filter((post) => post.category?.includes("lang-nghe"));
	const tamGuongPosts = allPosts.filter((post) => post.category?.includes("tam-guong-tre"));
	const thoiHoaLuaPosts = allPosts.filter((post) => post.category?.includes("thoi-hoa-lua"));

	const [isRolling, setIsRolling] = useState(false);

	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsRolling(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			}
		);

		observer.observe(sentinel);

		return () => {
			observer.unobserve(sentinel);
		};
	}, []);

	return (
		<Box h="1000px" position="relative">
			<div
				ref={sentinelRef}
				style={{
					position: "absolute",
					top: "0px",
					left: "0px",
					width: "100%",
					height: "10px",
					pointerEvents: "none",
					zIndex: 9999
				}}
			/>

			<Header isRolling={isRolling} />

			<Box w="full">
				<Box mb={12}>
					<PostCarousel posts={latestThreePosts} />
				</Box>
				<VStack gap={10} w="full" align="stretch">
					{baoTangPosts.length > 0 && <AutoScrollCarousel posts={baoTangPosts} />}
					{langNghePosts.length > 0 && <AutoScrollCarousel posts={langNghePosts} />}
					{tamGuongPosts.length > 0 && <AutoScrollCarousel posts={tamGuongPosts} />}
					{thoiHoaLuaPosts.length > 0 && <AutoScrollCarousel posts={thoiHoaLuaPosts} />}
				</VStack>
			</Box>
		</Box>
	);
}