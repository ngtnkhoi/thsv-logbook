import { useTranslation } from "react-i18next";
import { switchLanguage } from "#/utils/switch-language.ts";
import { Button, chakra } from "@chakra-ui/react";
import {useRouter} from "@tanstack/react-router";

export function SwitchLanguageButton({ color } : { color: string }) {
	const { i18n } = useTranslation();
	const router = useRouter();

	const currentLang = i18n.language;

	const handleToggleLanguage = () => {
		const nextLang = currentLang === "vi" ? "en" : "vi";
		switchLanguage(i18n, nextLang);
		void router.invalidate();
	};

	return (
		<Button
			onClick={handleToggleLanguage}
			variant="ghost"
			fontFamily="quicksand"
			fontSize={{ base: "md", md: "xl", lg: "3xl" }}
			color={color}
			aria-label="Toggle language"
			gap={2}
			_hover={{ opacity: 0.8 }}
			p={0}
			transition="color 0.4s ease"
		>
			<chakra.svg
				xmlns="http://www.w3.org/2000/svg"
				boxSize={{ base: "20px", md: "26px", lg: "28px" }}
				viewBox="0 0 24 24"
			>
				<g
					fill="none"
					stroke={color}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" />
					<path d="M13 2.05S16 6 16 12s-3 9.95-3 9.95m-2 0S8 18 8 12s3-9.95 3-9.95M2.63 15.5h18.74m-18.74-7h18.74" />
				</g>
			</chakra.svg>
			{currentLang === "vi" ? "VN" : "EN"}
		</Button>
	);
}