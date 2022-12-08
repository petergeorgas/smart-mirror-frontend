import { useEffect } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";

import clearSkyDay from "./Images/clear_day.png";
import clearSkyNight from "./Images/clear_night.png";
import cloudy from "./Images/cloudy.png";
import fog from "./Images/fog.png";
import partlyCloudyDay from "./Images/partly_cloudy_day.png";
import parytlyCloudyNight from "./Images/partly_cloudy_night.png";
import rainy from "./Images/rainy.png";
import snowy from "./Images/snowy.png";
import thunderstorm from "./Images/thunderstorm.png";
import Image from "next/image";

function Weather() {
  const northRidgevilleLatitude = "41.39";
  const northRidgeVilleLongitude = "-82.02";

  var url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    northRidgevilleLatitude +
    "&longitude=" +
    northRidgeVilleLongitude +
    "&hourly=apparent_temperature,precipitation,rain,showers,snowfall&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York";

  const [temperature, setTemperature] = React.useState("");
  const [image, setImage] = React.useState(undefined);

  function parseTime(str) {
    // Parses the time string passed by the API
    const split = str.split("T");
    const splitTimeValue = split[1].split(":");
    return +splitTimeValue[0];
  }

  function checkDay(num) {
    // Returns true if it is daytime
    if (num > 7 && num < 19) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTemperature(
          Math.round(data.current_weather.temperature) + "\u00b0" + "F"
        );
        const code = data.current_weather.weathercode;

        if (code === 0 || code === 1)
          checkDay(parseTime(data.current_weather.time))
            ? setImage(clearSkyDay)
            : setImage(clearSkyNight);
        else if (code === 2)
          checkDay(parseTime(data.current_weather.time))
            ? setImage(partlyCloudyDay)
            : setImage(parytlyCloudyNight);
        else if (code === 3) setImage(cloudy);
        else if (code === 45 || code === 48) setImage(fog);
        else if (
          code === 51 ||
          code === 53 ||
          code === 55 ||
          code === 56 ||
          code === 57 ||
          code === 61 ||
          code === 63 ||
          code === 65 ||
          code === 80 ||
          code === 81 ||
          code === 82
        )
          setImage(rainy);
        else if (
          code === 71 ||
          code === 73 ||
          code === 75 ||
          code === 77 ||
          code === 85 ||
          code === 86
        )
          setImage(snowy);
        else if (code === 95 || code === 96 || code === 99)
          setImage(thunderstorm);
      })
      .catch(function () {
        console.log("Failed to retrieve compiment.");
      });
  });

  return (
    <div>
      <Text fontWeight="bold" fontSize={"7xl"} color="white">
        {temperature}
      </Text>
      <Image src={image} />
    </div>
  );
}

export default Weather;
