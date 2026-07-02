import { useTranslation } from "react-i18next";
import { switchLanguage } from "#/utils/switch-language.ts";
import { Button } from "@chakra-ui/react";

export function SwitchLanguageButton() {
	const { i18n } = useTranslation();

	const currentLang = i18n.language;

	const handleToggleLanguage = () => {
		const nextLang = currentLang === "vi" ? "en" : "vi";
		switchLanguage(i18n, nextLang);
	};

	return (
		<Button
			onClick={handleToggleLanguage}
			variant="outline"
			size="sm"
			aria-label="Toggle language"
		>
			{currentLang === "vi" ? "VN" : "EN"}
		</Button>
	);
}