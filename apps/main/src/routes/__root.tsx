import React from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Provider } from "../components/ui/provider.tsx";
import { NotFoundPage, ErrorPage } from "../components/errors/not-found.tsx";
import { Toaster } from "#/components/ui/toaster.tsx";
import '@fontsource-variable/montserrat/index.css';
import '@fontsource-variable/quicksand/index.css';

import appCss from "../styles.css?url";

export const Route = createRootRoute({
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
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	notFoundComponent: NotFoundPage,
	errorComponent: ErrorPage,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const ChakraProvider = Provider as React.ComponentType<{ children: React.ReactNode }>;
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>TanStack Start Starter</title>
				<HeadContent />
			</head>
			<body>
				<ChakraProvider>
					{children}
					<Toaster />
				</ChakraProvider>
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
