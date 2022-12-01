import { useEffect } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";

var url;

function capitalizeFirstLetterAndAddPeriod(string) {
  return string.charAt(0).toUpperCase() + string.slice(1) + ".";
}

function Compliment() {
  const [compliment, setCompliment] = React.useState("");
  useEffect(() => {
    url = "https://complimentr.com/api";
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setCompliment(capitalizeFirstLetterAndAddPeriod(data.compliment));
      })
      .catch(function () {
        console.log("Failed to retrieve compiment.");
      });
  }, []);

  return (
    <div>
      <Text fontWeight="bold" fontSize={"4xl"} color="white">
        {compliment}
      </Text>
    </div>
  );
}

export default Compliment;
