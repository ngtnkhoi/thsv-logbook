import { Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: TrangChu,
});

function TrangChu() {
	return <Text>hello world</Text>;
}
