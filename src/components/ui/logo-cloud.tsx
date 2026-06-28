import {Box,Image} from "@chakra-ui/react";
export default function logocloud(){
    return(
    <Box
        w={{ base:"150px",sm:"200px",md:"250px",lg:"300px"}}
        borderRadius={"13px"}
        mt="20px"
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
};
