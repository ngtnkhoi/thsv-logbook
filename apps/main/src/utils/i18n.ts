import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			"greeting": "Hello",
			"search": "Search"
		}
	},
	vi: {
		translation: {
			"greeting": "Xin chào",
			"search": "Tìm kiếm"
		}
	}
};

export const createI18nInstance = (lng: string = 'vi') => {
	const instance = i18n.createInstance();

	void instance
	.use(initReactI18next)
	.init({
		resources,
		lng,
		fallbackLng: 'vi',
		interpolation: {
			escapeValue: false,
		},
	});

	return instance;
};