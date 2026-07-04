import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug } from '@/utils/data-fetching'
import { Box, Flex } from "@chakra-ui/react"
import { SlugHeader } from "#/components/commons/slug-header"
import { PostTitle } from "#/components/ui/post-title"
import { useHeroScroll } from "#/utils/use-post-scroll"
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import { PostContent } from "#/components/commons/Post-Content"

export const Route = createFileRoute('/$slug')({
	loader: async ({ params }) => {
		const post = await getPostBySlug(params.slug, getLangFromCookie())
		if (!post) {
			throw notFound()
		}
		return post
	},
	component: PostDetailComponent,
})

function PostDetailComponent() {
	const post = Route.useLoaderData();
	const isScrolledPastHero = useHeroScroll();

	return (
		<Box position="relative" w="full">

			<SlugHeader
				categoryName={post.category}
				postTitle={post.title}
				coverImageUrl={post.coverImage?.url}
				isScrolled={isScrolledPastHero}
			/>

			<Flex
				position="relative"
				direction="column"
				w="full"
				h="100vh"
				zIndex={2}
			>
				<Box
					position="absolute"
					top={0}
					left={0}
					w="full"
					h="full"
					backgroundImage={`url('${post.coverImage?.url}')`}
					backgroundSize="cover"
					backgroundPosition="center"
					backgroundRepeat="no-repeat"
					zIndex={1}
					opacity={isScrolledPastHero ? 0.3 : 1}
					transition="opacity 0.6s ease"
				/>

				<Box
					w="full"
					px={6}
					textAlign="center"
					zIndex={2}
					pt="140px"
					opacity={isScrolledPastHero ? 0 : 1}
					transform={isScrolledPastHero ? "translateY(-50px)" : "translateY(0)"}
					transition="all 0.5s ease"
				>
					<PostTitle title={post.title} />
				</Box>
			</Flex>
			<Box position="relative" zIndex={3} minH="100vh" w="full">
				<Box>
					<PostContent blocks={post.contentBlocks || []} />
				</Box>
			</Box>

		</Box>
	);
}