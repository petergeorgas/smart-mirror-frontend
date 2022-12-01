import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const height = "100px";

function Cat() {
  const [catUrl, setCatUrl] = useState("");

  return (
    <Image
      alt="random cat image"
      h="100%"
      w="100%"
      src="https://cataas.com/cat/says/%20"
      margin=""
      padding="5"
    />
  );
}

export default Cat;
