import { Box } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { auth } from "../../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getSettingsByUserId } from "../../firebase/firebase";

function Map() {
  const [user] = useAuthState(auth);
  const [startLocation, setStartLocation] = useState();
  const [endLocation, setEndLocation] = useState();

  useEffect(() => {
    if (user) {
      getSettingsByUserId(user.uid).then((settings) => {
        if (settings && settings.startLocation != undefined) {
          setStartLocation(settings.startLocation);
          console.log(startLocation);
        }
        if (settings && settings.endLocation != undefined) {
          setEndLocation(settings.endLocation);
          console.log(endLocation);
        }
      });
    }
  }, [startLocation]);
  const starturl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBzkJwRb9PUctHdPWU66dVgX6lpY288Fts `;

  useEffect(() => {
    fetch(starturl, {
      headers: {
        "access-control-allow-credentials": "true",
        "Access-Control-Allow-Origin": "true",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setAllInfo(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const originid = "ChIJScxbM7-WMIgRZS4whoS0Zzw";
  const destid = "ChIJn6btdMp4PIgRdbWVrQ87x_k";

  const srcstring = `https://www.google.com/maps/embed/v1/directions?origin=place_id:${originid}&destination=place_id:${destid}&key=AIzaSyBzkJwRb9PUctHdPWU66dVgX6lpY288Fts `;

  return (
    <Box
      as="iframe"
      title="Work Route"
      border="2px"
      borderColor="red"
      borderRadius="5"
      bg="black"
      color="white"
      w="100%"
      h="100%"
      padding="5"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen=""
      src={srcstring}
    ></Box>
  );
}

export default Map;
