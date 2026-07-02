import { Text, Heading, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { LogoCloud } from "../components/ui/logo-cloud"

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
			<LogoCloud />
		</VStack>
	)
}
