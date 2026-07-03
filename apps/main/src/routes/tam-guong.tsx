import { createFileRoute } from "@tanstack/react-router";
import { getPostsByCategory } from "#/utils/data-fetching";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import { CategoryPageLayout } from "#/components/commons/category-page-layout";

export const Route = createFileRoute('/tam-guong')({
	loader: async() => {
		return await getPostsByCategory("tam-guong-tre", getLangFromCookie());
	},
  component: tamGuong,
})

function tamGuong() {
	const posts = Route.useLoaderData();

  return <CategoryPageLayout posts={posts} />;
}
