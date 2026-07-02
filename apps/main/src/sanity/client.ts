import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: "tdgcelul",
	dataset: "production",
	apiVersion: "2026-05-15",
	useCdn: false,
});
