import { SimpleGrid, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cat from "../../src/components/CatImage/catimage";
import Clock from "../../src/components/Clock/Clock";
import { getUser } from "../../src/firebase/firebase";

const componentMap = {
  clock: <Clock />,
};

export default function MirrorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [boxes, setBoxes] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        console.log(user.layout);
        user?.layout.forEach((item) => {
          console.log(item);
          let newBoxes = [...boxes];

          newBoxes[item.row * 4 + item.col] = item.componentName;
          setBoxes(newBoxes);
        });
      });
    }
  }, [id]);

  const components = boxes.map((item, i) => {
    if (item === "default") {
      return <Box key={i} bg="tomato" h="200px"></Box>;
    } else {
      return (
        <Box key={i} bg="tomato" h="200px">
          {componentMap[item]}
        </Box>
      );
    }
  });

  return (
    <SimpleGrid columns={4} spacing={1}>
      {components}
    </SimpleGrid>
  );
}
