import { createFileRoute } from "@tanstack/react-router";
import { Header } from "#/components/commons/header/header.tsx";
import { Box, VStack } from "@chakra-ui/react";
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

	return (
		<Box h="1000px" position="relative">
			<Header />

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