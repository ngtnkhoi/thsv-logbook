import { client } from "@/sanity/client";

export interface SanityImage {
	_type: "image";
	asset: {
		_ref: string;
		_type: "reference";
	};
	blurDataURL?: string;
	url?: string;
}

export interface ContentBlock {
	_key: string;
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

const POST_CORE_FIELDS = `
  _id,
  "title": coalesce(title[$lang], title.vi),
  "slug": slug.current,
  category,
  "excerpt": coalesce(excerpt[$lang], excerpt.vi),
  "coverImage": coverImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "url": asset->url
  },
  publishedAt
`;

export async function getAllPosts(lang: "vi" | "en" = "vi"): Promise<Post[]> {
	const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${POST_CORE_FIELDS}
  }`;

	return await client.fetch<Post[]>(query, { lang });
}

export async function getPostsByCategory(categorySlug: string, lang: "vi" | "en" = "vi"): Promise<Post[]> {
	const query = `*[_type == "post" && defined(slug.current) && $categorySlug in category] | order(publishedAt desc) {
    ${POST_CORE_FIELDS}
  }`;

	return await client.fetch<Post[]>(query, { categorySlug, lang });
}

export async function getPostBySlug(slug: string, lang: "vi" | "en" = "vi"): Promise<Post | null> {
	const query = `*[_type == "post" && slug.current == $slug][0] {
    ${POST_CORE_FIELDS},
    contentBlocks[] {
      _key,
      mediaType,
      "image": image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "url": asset->url
      },
      "videoUrl": videoFile.asset->url, 
      "text": coalesce(text[$lang], text.vi)
    }
  }`;

	return await client.fetch<Post | null>(query, { slug, lang });
}