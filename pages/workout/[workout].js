/* eslint-disable react-hooks/exhaustive-deps */
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cat from "../../src/components/CatImage/catimage";
import Clock from "../../src/components/Clock/Clock";
import { getUser } from "../../src/firebase/firebase";
import WebSocket from "../../src/components/WebSocket/WebSocket"
import Workout from "../../src/components/Workout/Workout";

export default function WorkoutPage() {
  const router = useRouter();
  const { workout } = router.query;

  console.log(workout)

  return (<WebSocket><Workout workoutType={workout}/></WebSocket>)
}
