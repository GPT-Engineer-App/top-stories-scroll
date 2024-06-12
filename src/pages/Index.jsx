import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Link, Box, Input, useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { fetchTopStories } from "../api/hackerNewsAPI";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const getTopStories = async () => {
      const topStories = await fetchTopStories();
      setStories(topStories);
      setFilteredStories(topStories);
    };

    getTopStories();
  }, []);

  useEffect(() => {
    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStories(filtered);
  }, [searchTerm, stories]);

  return (
    <Container centerContent maxW="container.md" py={4}>
      <VStack spacing={4} width="100%">
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Top Hacker News Stories</Text>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <VStack spacing={4} width="100%" overflowY="auto" maxHeight="70vh">
          {filteredStories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text fontSize="lg" fontWeight="bold">
                {story.title}
              </Text>
              <Text>Upvotes: {story.score}</Text>
              <Link href={story.url} color="teal.500" isExternal>
                Read more
              </Link>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;