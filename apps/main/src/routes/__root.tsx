import React, {useMemo} from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Provider } from "../components/ui/provider.tsx";
import { NotFoundPage, ErrorPage } from "../components/errors/not-found.tsx";
import { Toaster } from "#/components/ui/toaster.tsx";
import '@fontsource-variable/montserrat/index.css';
import '@fontsource-variable/quicksand/index.css';
import { I18nextProvider } from "react-i18next";
import { createI18nInstance } from "#/utils/i18n";
import { getLanguageFromServer } from "#/utils/get-language-server"
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: async () => {
		let initialLng = "vi";

		if (typeof document !== "undefined") {
			const match = document.cookie.match(/i18nextLng=([^;]+)/);
			if (match && (match[1] === "vi" || match[1] === "en")) {
				initialLng = match[1];
			}
		} else {
			initialLng = await getLanguageFromServer();
		}

		return { initialLng };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Sài Gòn UNFOLDED",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any",
			},
		],
	}),
	notFoundComponent: NotFoundPage,
	errorComponent: ErrorPage,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const ChakraProvider = Provider as React.ComponentType<{ children: React.ReactNode }>;
	const { initialLng } = Route.useLoaderData();
	const i18n = useMemo(() => createI18nInstance(initialLng), [initialLng]);

	return (
		<html lang={i18n.language} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<I18nextProvider i18n={i18n}>
					<ChakraProvider>
						{children}
						<Toaster />
					</ChakraProvider>
				</I18nextProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
