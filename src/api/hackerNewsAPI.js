const HN_API_BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const fetchTopStories = async () => {
  try {
    const response = await fetch(`${HN_API_BASE_URL}/topstories.json`);
    const storyIds = await response.json();
    const top5StoryIds = storyIds.slice(0, 5);

    const storyPromises = top5StoryIds.map(async (id) => {
      const storyResponse = await fetch(`${HN_API_BASE_URL}/item/${id}.json`);
      return storyResponse.json();
    });

    const stories = await Promise.all(storyPromises);
    return stories;
  } catch (error) {
    console.error("Failed to fetch top stories:", error);
    return [];
  }
};