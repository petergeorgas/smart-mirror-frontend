import { SimpleGrid, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Cat from "../../src/components/CatImage/catimage";
import Clock from "../../src/components/Clock/Clock";

export default function MirrorPage() {
  const boxes = [];

  for (let i = 0; i < 16; i++) {
    boxes.push(
      <Box key={i} bg="tomato" height="200px">
        <Clock />
      </Box>
    );
  }
  return (
    <SimpleGrid columns={4} spacing={1}>
      {boxes}
    </SimpleGrid>
  );
}
