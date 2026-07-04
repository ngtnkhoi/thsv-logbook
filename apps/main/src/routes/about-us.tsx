import {Box,Flex,Heading,Image,Link} from "@chakra-ui/react";
import {createFileRoute,Link as HLink} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLangFromCookie } from "#/utils/get-lang-from-cookie.ts";
import {useEffect} from "react";

export const Route = createFileRoute("/about-us")({
	loader: () => {
		const currentLang = getLangFromCookie();
		return { currentLang };
	},
	component:AboutUs
});

function AboutUs(){
	const { currentLang } = Route.useLoaderData();
	const { t, i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language !== currentLang) {
			void i18n.changeLanguage(currentLang);
		}
	}, [currentLang, i18n]);

	return (
		<Box
			minH="100vh"
			bgImage="linear-gradient(rgba(255,220,220,0.7), rgba(255,220,220,0.7)),url('/bg.png')"
			bgSize="190px"
			bgRepeat="repeat"
			py={20}
			px={4}
		>
			<Box
				w="90%"
				mx="auto"
				bg="#8A2626"
				borderRadius="20px"
				py={4}
				mb={6}
				position="relative"
			>
				<Box
					position="absolute"
					left={{
						base: "10px",
						sm: "15px",
						md: "20px"
					}}
					top="50%"
					transform="translateY(-50%)"
				>
					<HLink to="/">
						<Image
							src="/home.png"
							alt="Home"
							boxSize={{
								base: "7",
								md: "10"
							}}
							filter="brightness(0) invert(1)"
						/>
					</HLink>
				</Box>
				<Heading
					textAlign="center"
					textTransform="uppercase"
					color="white"
					fontSize={{
						base: "2xl",
						sm: "3xl",
						md: "4xl"
					}}
				>
					{t("about.title")}
				</Heading>
			</Box>

			<Box
				w="90%"
				minH={{
					base: "auto",
					lg: "70vh"
				}}
				mx="auto"
				bg="#F2EFD8"
				p={8}
				color="black"
			>
				<Flex
					gap={8}
					direction={{
						base: "column",
						lg: "row"
					}}
				>
					<Box flex="0 0 40%">
						<Image
							src="/doihinh.jpg"
							alt="Đội hình Sài Gòn Unfolded"
							w="100%"
						/>
					</Box>

					<Box flex="1">
						{/* Đoạn văn 1 */}
						<Box
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							lineHeight="1.6"
							mb={8}
						>
							<Box as="span" fontWeight="700">
								{t("about.text.0.bold")}
							</Box>
							{t("about.text.0.content")}
						</Box>

						<Box
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							lineHeight="1.6"
							mb={8}
						>
							{t("about.text.1.content")}
						</Box>

						<Box
							fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
							lineHeight="1.6"
						>
							<Box fontWeight="700">
								{t("about.contact.bold")}
							</Box>
							<Link
								href={t("about.contact.href")}
								color="blue.600"
								textDecoration="underline"
								target="_blank"
							>
								{t("about.contact.label")}
							</Link>
						</Box>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
}
