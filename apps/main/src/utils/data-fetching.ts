import { client } from "@/sanity/client";

export interface SanityImage {
	_type: "image";
	asset: {
		_ref: string;
		_type: "reference";
	};
}

export interface ContentBlock {
	mediaType: "image" | "video";
	image?: SanityImage;
	videoUrl?: string;
	text: string;
}

export interface Post {
	_id: string;
	title: string;
	slug: string;
	category: string[];
	excerpt: string;
	coverImage?: SanityImage;
	publishedAt: string;
	contentBlocks?: ContentBlock[];
}

export async function getAllPosts(lang: "vi" | "en" = "vi"): Promise<Post[]> {
	try {
		const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      "title": coalesce(title[$lang], title.vi),
      "slug": slug.current,
      category,
      "excerpt": coalesce(excerpt[$lang], excerpt.vi),
      coverImage,
      publishedAt
    }`;

		return await client.fetch<Post[]>(query, { lang });
	} catch (error) {
		console.error("Lỗi khi fetch danh sách bài viết:", error);
		return [];
	}
}

export async function getPostsByCategory(categorySlug: string, lang: "vi" | "en" = "vi"): Promise<Post[]> {
	try {
		const query = `*[_type == "post" && $categorySlug in category] | order(publishedAt desc) {
      _id,
      "title": coalesce(title[$lang], title.vi),
      "slug": slug.current,
      category,
      "excerpt": coalesce(excerpt[$lang], excerpt.vi),
      coverImage,
      publishedAt
    }`;

		return await client.fetch<Post[]>(query, { categorySlug, lang });
	} catch (error) {
		console.error(`Lỗi khi fetch bài viết của chuyên mục ${categorySlug}:`, error);
		return [];
	}
}

export async function getPostBySlug(slug: string, lang: "vi" | "en" = "vi"): Promise<Post | null> {
	try {
		const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      "title": coalesce(title[$lang], title.vi),
      "slug": slug.current,
      category,
      "excerpt": coalesce(excerpt[$lang], excerpt.vi),
      coverImage,
      publishedAt,
      contentBlocks[] {
        mediaType,
        image,
        "videoUrl": videoFile.asset->url, 
        "text": coalesce(text[$lang], text.vi)
      }
    }`;

		return await client.fetch<Post | null>(query, { slug, lang });
	} catch (error) {
		console.error(`Lỗi khi fetch chi tiết bài viết ${slug}:`, error);
		return null;
	}
}