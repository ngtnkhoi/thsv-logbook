"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode.tsx";

const customSystem = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				quicksand: { value: "'Quicksand Variable', sans-serif" },
				montserrat: { value: "'Montserrat Variable', sans-serif" },
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
