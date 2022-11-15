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
      <img style={{ height: "100%", width: "100%" }} src={catUrl} />
    </div>
  );
}

export default Cat;
