import {createFileRoute} from "@tanstack/react-router";
import { getPostsByCategory } from "#/utils/data-fetching";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import { CategoryPageLayout } from "#/components/commons/category-page-layout";

export const Route = createFileRoute('/lang-nghe')({
	loader: async() => {
		return await getPostsByCategory("lang-nghe", getLangFromCookie());
	},
  component: langNghe,
})

function langNghe() {
	const posts = Route.useLoaderData();

  return <CategoryPageLayout posts={posts} />
}
