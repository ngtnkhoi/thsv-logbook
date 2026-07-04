import { Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

export function LogoCloud(){
	return(
		<ChakraLink
			asChild
			w={{ base: "130px", sm: "180px", md: "250px", lg: "300px" }}
			borderRadius={"17px"}
			mt={0}
			mx="auto"
			bg="#FCEDC9"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<RouterLink to="/">
				<Image
					src="/logo.png"
					alt="Logo Banner"
					w="90%"
					h="auto"
				/>
			</RouterLink>
		</ChakraLink>
	);
}