import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getLanguageFromServer = createServerFn({ method: "GET" }).handler(async () => {
	const headers = getRequestHeaders();

	const cookieHeader =
		(headers instanceof Headers ? headers.get("cookie") : (headers as any).cookie) || "";

	const match = cookieHeader.match(/i18nextLng=([^;]+)/);
	if (match && (match[1] === "vi" || match[1] === "en")) {
		return match[1];
	}

	return "vi";
});