import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '#/locales/en-translation.json';
import translationVI from '@/locales/vi-translation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	vi: {
		translation: translationVI,
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