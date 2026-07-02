import { Text, Heading, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { SwitchLanguageButton } from "#/components/ui/switch-language-button.tsx";

export const Route = createFileRoute("/")({
	component: TrangChu,
});

function TrangChu() {
	return (
		<VStack>
			<Heading>
				hello world
			</Heading>
			<Text>
				hello world
			</Text>
			<SwitchLanguageButton />
		</VStack>
	)
}
