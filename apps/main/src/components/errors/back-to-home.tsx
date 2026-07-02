import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useReducedMotion } from "motion/react";

// This component renders a button that links to the home page on the `/` route.
// If the user prefers reduced motion, the button will not animate, and the left arrow icon won't show up.
export default function BackToHome() {
	const prefersReducedMotion = useReducedMotion();

	return (
		<Button asChild variant="ghost" size="sm" px={0}>
			<Link to="/">
				<HStack gap={1}>
					{!prefersReducedMotion ? <ArrowLeftIcon aria-hidden="true" size={16} /> : null}
					<Text>Về trang chủ</Text>
				</HStack>
			</Link>
		</Button>
	);
}