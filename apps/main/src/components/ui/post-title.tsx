import { Text } from "@chakra-ui/react"

export function PostTitle({ title } : { title: string }) {
	return (
		<Text
		fontFamily="quicksand"
		fontWeight="bold"
		color="#641615"
		textTransform="uppercase"
		fontSize={{base: "2xl", md: "4xl", lg: "8xl"}}
		>
			{title}
		</Text>
	)
}