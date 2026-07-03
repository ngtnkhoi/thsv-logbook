export const getLangFromCookie = (): "vi" | "en" => {
	if (typeof document === "undefined") return "vi";
	const match = document.cookie.match(/(?:^|; )i18nextLng=([^;]*)/);
	const lang = match ? match[1] : "vi";
	return lang === "en" ? "en" : "vi";
};
