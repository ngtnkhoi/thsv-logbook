"use client";

import { useState, useCallback, type ChangeEvent, type KeyboardEvent } from "react";
import {
	Button, Input, HStack, VStack, Text, Box, Spinner,
	useDisclosure, DialogRoot, DialogBackdrop, DialogContent,
	DialogHeader, DialogBody, CloseButton
} from "@chakra-ui/react";
import { searchPosts } from "#/utils/search.ts";

interface PostResult {
	_id: string;
	title?: { vi?: string; en?: string };
	category?: string[];
	excerpt?: { vi?: string; en?: string };
	slug?: { current?: string };
}

export function SearchButton() {
	const { open, onOpen, onClose } = useDisclosure();
	const [keyword, setKeyword] = useState("");
	const [results, setResults] = useState<PostResult[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = useCallback(() => {
		onClose();
		setTimeout(() => {
			setKeyword("");
			setResults(null);
		}, 200);
	}, [onClose]);

	const executeSearch = async () => {
		if (!keyword.trim() || isLoading) return;
		setIsLoading(true);
		setResults(null);

		try {
			const data = await searchPosts({ keyword, limit: 5 });
			setResults(data);
		} catch (error) {
			console.error("Lỗi khi tìm kiếm:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<HStack as="button" onClick={onOpen} gap={0} color="white" _hover={{ opacity: 0.8 }} transition="all 0.2s">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="14" cy="10" r="6" />
					<line x1="3" y1="21" x2="9.7" y2="14.3" />
				</svg>
				<Text fontSize="lg" fontFamily="quicksand" fontWeight="500">Tìm kiếm</Text>
			</HStack>

			<DialogRoot
				open={open}
				onOpenChange={(e: { open: boolean }) => !e.open && handleClose()}
				size="xl"
			>
				<DialogBackdrop backdropFilter="blur(4px)" bg="blackAlpha.600" />

				<DialogContent bg="#FDF5E6" mt="10vh" borderRadius="xl" position="relative" shadow="xl">
					<DialogHeader color="#701616" fontFamily="heading" pb={2} pr={12}>
						Tìm kiếm bài viết
					</DialogHeader>

					<CloseButton color="#701616" position="absolute" top={4} right={4} onClick={handleClose} />

					<DialogBody pb={6} maxH="70vh" overflowY="auto">
						<VStack align="stretch" gap={4}>

							<HStack gap={2}>
								<Input
									placeholder="Nhập từ khoá tìm kiếm"
									value={keyword}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										setKeyword(e.target.value);
										if (!e.target.value.trim()) setResults(null);
									}}
									onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && executeSearch()}
									bg="white"
									borderColor="#701616"
									_focus={{ borderColor: "#701616", boxShadow: "0 0 0 1px #701616" }}
									color="#4A1515"
									autoFocus
								/>
								<Button
									onClick={executeSearch}
									disabled={isLoading || !keyword.trim()}
									bg="#701616"
									color="white"
									_hover={{ bg: "#5A1111" }}
								>
									{isLoading ? <Spinner size="sm" /> : "Tìm"}
								</Button>
							</HStack>

							{results !== null && results.length === 0 && (
								<Text color="gray.600" fontSize="sm" fontFamily="body" fontStyle="italic">
									Không tìm thấy kết quả nào cho "{keyword}"
								</Text>
							)}

							{results !== null && results.length > 0 && (
								<Box mt={2}>
									<Text fontWeight="bold" mb={3} color="#701616" fontFamily="heading">
										Kết quả ({results.length}):
									</Text>
									<VStack align="stretch" gap={3}>
										{results.map((post) => (
											<Box
												as="a"
												href={`/${post.slug?.current || ""}`}
												key={post._id}
												p={3}
												borderRadius="xl"
												bg="#E3CDCC"
												color="#4A1515"
												display="block"
												transition="all 0.2s"
												_hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
												cursor="pointer"
												style={{ textDecoration: "none" }} // Xóa gạch chân mặc định của thẻ a
											>
												<Text fontFamily="heading" fontWeight={700} fontSize="md">
													{post.title?.vi || post.title?.en || "Bài viết không tên"}
												</Text>
												{post.excerpt?.vi && (
													<Text fontSize="sm" mt={2} lineClamp={2}>{post.excerpt.vi}</Text>
												)}
											</Box>
										))}
									</VStack>
								</Box>
							)}
						</VStack>
					</DialogBody>
				</DialogContent>
			</DialogRoot>
		</>
	);
}