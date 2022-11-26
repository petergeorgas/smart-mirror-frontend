import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const height = "100px";

function Cat() {
  const [catUrl, setCatUrl] = useState("");

  useEffect(() => {
    fetch("https://aws.random.cat/meow")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCatUrl(data.file);
      });
  }, []);

  return (
    <div>
      <Image alt="random cat image" h="full" w="full" src={catUrl} />
    </div>
  );
}

export default Cat;
