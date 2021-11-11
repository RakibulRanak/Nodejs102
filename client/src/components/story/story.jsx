import { Center, Box, Heading, Flex } from "@chakra-ui/react";
const Story = (story) => {

    return (
        <Box minH="15vh" minW="85vh" p={3}>

            <Center>
                <Flex border="1px" padding="50px" align="center" direction="column">
                    <Box >
                        <Heading>
                            {story.title}
                        </Heading>
                        <Box align="center" >
                            {story.postedAt}
                        </Box>
                    </Box>
                    <Box >
                        {story.author}
                    </Box>
                    <Box >
                        {story.story}
                    </Box>
                </Flex>
            </Center>
        </Box>
    );

};

export default Story;
