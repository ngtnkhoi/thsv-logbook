import { createFileRoute } from '@tanstack/react-router'
import { Text } from '@chakra-ui/react';

export const Route = createFileRoute('/')({
    component: Home
})

function Home() {
    return (
        <Text> Hello World </Text>
    );
}
