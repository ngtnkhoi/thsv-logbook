import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug } from '@/utils/data-fetching'
import { Text } from "@chakra-ui/react"

export const Route = createFileRoute('/$slug')({
	loader: async ({ params }) => {
		const post = await getPostBySlug(params.slug, 'vi')

		if (!post) {
			throw notFound()
		}

		return post
	},
	component: PostDetailComponent,
})

function PostDetailComponent() {
	//receive data from loader: const post = Route.useLoaderData()

	return (
		<Text> Hello World </Text>
	)
}