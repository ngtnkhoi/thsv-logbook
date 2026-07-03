import { createFileRoute } from "@tanstack/react-router";
import { getPostsByCategory } from "#/utils/data-fetching";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import { CategoryPageLayout } from "#/components/commons/category-page-layout";

export const Route = createFileRoute('/hoa-lua')({
	loader: async() => {
		return await getPostsByCategory("hoa-lua", getLangFromCookie());
	},
  component: hoaLua,
})

function hoaLua() {
	const posts = Route.useLoaderData();

  return <CategoryPageLayout posts={posts} />;
}
