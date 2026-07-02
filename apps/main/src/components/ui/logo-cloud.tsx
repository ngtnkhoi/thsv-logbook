import { Box, Image } from "@chakra-ui/react";

export function LogoCloud(){
	return(
		<Box
			w={{ base: "130px", sm: "180px", md: "250px", lg: "300px" }}
			borderRadius={"17px"}
			mt={0}
			mx="auto"
			bg="#FCEDC9"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Image
				src="/logo.png"
				alt="Logo Banner"
				w="90%"
				h="auto"
			/>
		</Box>
	);
}