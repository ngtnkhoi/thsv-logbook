import type { i18n } from "i18next";

export const switchLanguage = (i18nInstance: i18n, lng: "vi" | "en") => {
	void i18nInstance.changeLanguage(lng);

	document.cookie = `i18nextLng=${lng}; path=/; max-age=31536000; SameSite=Lax`;

	document.documentElement.lang = lng;
};