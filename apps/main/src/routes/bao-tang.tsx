import { createFileRoute } from "@tanstack/react-router";
import { getPostsByCategory } from "#/utils/data-fetching";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import { CategoryPageLayout } from "#/components/commons/category-page-layout";

export const Route = createFileRoute("/bao-tang")({
	loader: async () => {
		return await getPostsByCategory("bao-tang", getLangFromCookie());
	},
	component: BaoTangPage,
});

function BaoTangPage() {
	const posts = Route.useLoaderData();

	return <CategoryPageLayout posts={posts} />;
}