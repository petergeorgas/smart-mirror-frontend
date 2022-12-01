import { Heading, Box, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";

function News(props) {
  const { newsType } = props;

  const [feed, setFeed] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:3000/api/rss/getNewsRss")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setFeed(json.items);
      })
      .catch((err) => {
        console.log(err);
      });
    // Every 15 minutes, check the RSS FEED.
    setInterval(() => {
      fetch("http://localhost:3000/api/rss/getNewsRss")
        .then((resp) => {
          return resp.json();
        })
        .then((json) => {
          setFeed(json.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 15 * 60 * 1000);
  }, []);

  const topNewsStories = feed
    ? feed.slice(0, 5).map((story, i) => {
        return (
          <Box key={i} p={2} border="1px" borderRadius="lg" mb="2">
            <Text
              fontSize="lg"
              noOfLines={2}
            >{`${story.title} (${story.creator})`}</Text>
          </Box>
        );
      })
    : [];

  return (
    <VStack>
      <Heading>{"Today's Top News"}</Heading>
      <Box w="600px">{topNewsStories}</Box>
    </VStack>
  );
}

export default News;
