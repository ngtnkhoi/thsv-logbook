"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode.tsx";

const customSystem = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				heading: { value: "'Quicksand', sans-serif" },
				body: { value: "'Montserrat', sans-serif" },
			},
		},
	},
});

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={customSystem}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	);
}
