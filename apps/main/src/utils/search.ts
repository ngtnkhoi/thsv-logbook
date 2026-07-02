import { client } from '#/sanity/client';

interface SearchPostsParams {
	keyword?: string;
	page?: number;
	limit?: number;
}

function slugify(text: string) {
	return text
	.normalize("NFD")
	.replace(/[\u0300-\u036f]/g, "")
	.toLowerCase()
	.trim()
	.replace(/\s+/g, "-");
}

export async function searchPosts({ keyword = "", page = 1, limit = 10 }: SearchPostsParams) {
	const filters = ['_type == "post"'];
	const params: Record<string, any> = {
		start: (page - 1) * limit,
		end: page * limit,
	};

	if (keyword) {
		params.keyword = keyword;
		params.categoryKeyword = slugify(keyword) + "*";

		filters.push(`(
     [title.vi, title.en, excerpt.vi, excerpt.en] match text::query($keyword)
     || category match $categoryKeyword
     || category[] match $categoryKeyword
   )`);
	}

	let query = `*[${filters.join(' && ')}]`;

	if (keyword) {
		query += ` 
      | score(
        boost([title.vi, title.en] match text::query($keyword), 3),
        boost(category match $categoryKeyword || category[] match $categoryKeyword, 2),
        boost([excerpt.vi, excerpt.en] match text::query($keyword), 1)
      )
      | order(_score desc, publishedAt desc)
    `;
	} else {
		query += ` | order(publishedAt desc)`;
	}

	query += ` [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    category,
    "coverImageUrl": coverImage.asset->url,
    "blurDataURL": coverImage.asset->metadata.lqip,
    publishedAt,
    _score 
  }`;

	try {
		return await client.fetch(query, params);
	} catch (error) {
		console.error("Lỗi khi tìm kiếm bài viết Sanity:", error);
		throw error;
	}
}