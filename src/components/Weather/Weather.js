import { useEffect } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";

var url = 'https://api.open-meteo.com/v1/forecast?latitude=41.24&longitude=-82.12&hourly=temperature_2m';

function Weather() {
  const [weather, setWeather] = React.useState("");
  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setWeather(data.hourly.temperature_2m[0]);
      })
      .catch(function () {
        console.log("Failed to retrieve weather.");
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

export default Weather;
