import { Code, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import BackToHome from "@/components/errors/back-to-home.tsx";

export function NotFoundPage() {
	return (
		<VStack minH="100dvh" align="center" justify="center" gap={2} bg="bg.muted" px={6} textAlign="center">
			<Text fontSize="lg" fontWeight="medium" color="fg">
				404{" "}
				<Text as="span" color="fg.muted" mx={2}>
					|
				</Text>{" "}
				Không tìm thấy
			</Text>

			<Text fontSize="sm" color="fg.muted">
				Trang bạn đang tìm hiện không tồn tại.
			</Text>

			<BackToHome />
		</VStack>
	);
}

function normalizeError(error: unknown) {
	if (error instanceof Error) {
		return {
			name: error.name || "Error",
			message: error.message || "An unknown error occurred",
			stack: error.stack || null,
		};
	}

	if (typeof error === "string") {
		return {
			name: "Error",
			message: error,
			stack: null,
		};
	}

	return {
		name: "Error",
		message: (() => {
			try {
				return JSON.stringify(error, null, 2) || String(error);
			} catch {
				return String(error);
			}
		})(),
		stack: null,
	};
}

export function ErrorPage({ error }: { error: unknown }) {
	const normalizedError = normalizeError(error);
	console.error("[ErrorPage]", error);

	return (
		<VStack minH="100dvh" align="center" justify="center" bg="bg.muted" p={6}>
			<Stack
				w="full"
				maxW="4xl"
				gap={4}
				rounded="2xl"
				bg="bg"
				p={6}
				shadow="sm"
				border="1px solid"
				borderColor="border"
			>
				<Stack gap={1}>
					<Text fontSize="lg" fontWeight="medium" color="fg">
						Có lỗi xảy ra
					</Text>
					<Text fontSize="sm" color="fg.muted">
						Vui lòng thử lại sau hoặc liên hệ với bộ phận kỹ thuật để được hỗ trợ thêm.
					</Text>
				</Stack>

				<Separator />

				{/* TODO: remove after deploy succeed */}
				<Stack gap={2}>
					<Text fontSize="sm" fontWeight="bold" color="fg">
						{normalizedError.name}
					</Text>
					<Code p={3} whiteSpace="pre-wrap" display="block" rounded="md">
						{normalizedError.message}
					</Code>
					{normalizedError.stack ? (
						<Code p={3} whiteSpace="pre-wrap" display="block" rounded="md" fontSize="xs" maxH="40vh" overflow="auto">
							{normalizedError.stack}
						</Code>
					) : null}
				</Stack>

				<BackToHome />
			</Stack>
		</VStack>
	);
}

export default NotFoundPage;