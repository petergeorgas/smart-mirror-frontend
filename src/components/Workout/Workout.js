import { useEffect, useReducer } from "react";
import React from "react";
import prettyMilliseconds from "pretty-ms";
// Exercises
import push_up from "./Exercises/push_up_gif.gif";
import arm_circles from "./Exercises/arm_circles_gif.gif";
import jumping_jack from "./Exercises/jumping_jack_gif.gif";
import lunges from "./Exercises/lunges_gif.gif";
import squat from "./Exercises/squat_gif.gif";
import burpees from "./Exercises/burpees_gif.gif";
import situp from "./Exercises/sit_up_gif.gif";
import crunches from "./Exercises/crunches_gif.gif";
import kneepushup from "./Exercises/knee_push_up_gif.gif";
import vsitbicycles from "./Exercises/v_sit_bicycles_gif.gif";
import rollup from "./Exercises/roll_up_gif.gif";
import sprintercrunch from "./Exercises/sprinter_crunch_gif.gif";
import russiantwist from "./Exercises/russian_twist_gif.gif";
import boattwist from "./Exercises/boat_twist_gif.gif";
import kneehug from "./Exercises/knee_hug_gif.gif";
import vsit from "./Exercises/v_sit_gif.gif";
import vup from "./Exercises/v_up_gif.gif";
import breaktime from "./Exercises/break_time_gif.gif";
import crisscross from "./Exercises/criss_cross_crunches_gif.gif";
import rest from "./Exercises/rest_time_gif.gif";
import pose_1 from "./Exercises/upward salute.png";
import pose_2 from "./Exercises/upward_salute_side_bend.png";
import pose_3 from "./Exercises/tree.png";
import pose_4 from "./Exercises/lord_of_the_dance.png";
import pose_5 from "./Exercises/warrior_i.png";
import pose_6 from "./Exercises/warrior_iii.png";
import pose_7 from "./Exercises/extended_tabletop.png";
import pose_8 from "./Exercises/upward_facing_dog.png";
import pose_9 from "./Exercises/downward_facing_dog.png";
import pose_10 from "./Exercises/seated_forward_bend.png";
import goodjob from "./Exercises/good_job_gif.gif";
import Image from "next/image";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const workout_map = {
  generalworkout: {
    names: [
      "Arm Circles",
      "Rest Time",
      "Jumping Jacks",
      "Rest Time",
      "Lunges",
      "Rest Time",
      "Squats",
      "Rest Time",
      "Push Ups",
      "Break Time",
      "Burpees",
      "Rest Time",
      "Sit Ups",
      "Rest Time",
      "Crunches",
      "Rest Time",
      "Knee Push Ups",
      "Rest Time",
      "Criss Cross Crunches",
      "Complete!",
    ],
    images: [
      arm_circles,
      rest,
      jumping_jack,
      rest,
      lunges,
      rest,
      squat,
      rest,
      push_up,
      breaktime,
      burpees,
      rest,
      situp,
      rest,
      crunches,
      rest,
      kneepushup,
      rest,
      crisscross,
      goodjob,
    ],
  },
  yogaworkout: {
    names: [
      "Upward Salute",
      "Rest Time",
      "Upward Salute Side Bend",
      "Rest Time",
      "Tree",
      "Rest Time",
      "Lord of the Dance",
      "Rest Time",
      "Warrior I",
      "Break Time",
      "Warrior III",
      "Rest Time",
      "Extended Tabletop",
      "Rest Time",
      "Upward Facing Dog",
      "Rest Time",
      "Downward Facing Dog",
      "Rest Time",
      "Seated Forward Bend",
      "Complete!",
    ],
    images: [
      pose_1,
      rest,
      pose_2,
      rest,
      pose_3,
      rest,
      pose_4,
      rest,
      pose_5,
      breaktime,
      pose_6,
      rest,
      pose_7,
      rest,
      pose_8,
      rest,
      pose_9,
      rest,
      pose_10,
      goodjob,
    ],
  },
  coreworkout: {
    names: [
      "Sit Ups",
      "Rest Time",
      "Crunches",
      "Rest Time",
      "V Sit Bicycles",
      "Rest Time",
      "Roll Ups",
      "Rest Time",
      "Sprinter Crunches",
      "Break Time",
      "Russian Twists",
      "Rest Time",
      "Boat Twists",
      "Rest Time",
      "Knee Hugs",
      "Rest Time",
      "V Sits",
      "Rest Time",
      "V Ups",
      "Complete!",
    ],
    images: [
      situp,
      rest,
      crunches,
      rest,
      vsitbicycles,
      rest,
      rollup,
      rest,
      sprintercrunch,
      breaktime,
      russiantwist,
      rest,
      boattwist,
      rest,
      kneehug,
      rest,
      vsit,
      rest,
      vup,
      goodjob,
    ],
  },
};

const WORKOUT_DURATION = 60; // 60 Second Workouts
const NORMAL_REST_DURATION = 30; // 30 second rest
const BREAK_REST_DURATION = 60;

function Workout({ workoutType }) {
  console.log(workoutType);

  const [counter, setCounter] = React.useState(WORKOUT_DURATION);
  const [restPeriod, toggleRestPeriod] = useReducer((state) => {
    return !state;
  }, false);
  const router = useRouter();
  const [workoutIdx, setWorkoutIdx] = useState(0);

  useEffect(() => {
    if (counter > 0 && workoutIdx < 19) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (workoutIdx == 19) {
      setTimeout(() => {
        router.push("/hello");
      }, 15 * 1000);
    } else {
      // Counter has reached 0

      setWorkoutIdx(workoutIdx + 1);

      if (!restPeriod) {
        // We are going to transition to a rest period
        // If we are in a rest period
        if (workoutIdx + 1 === 9) {
          setCounter(BREAK_REST_DURATION);
        } else {
          setCounter(NORMAL_REST_DURATION);
        }
      } else {
        // We are transitioning FROM a rest period
        setCounter(WORKOUT_DURATION);
      }
      toggleRestPeriod();
    }
  }, [counter]);

  const mins = Math.floor(counter / 60);
  const seconds = counter - mins * 60;

  const workoutImage =
    restPeriod && workoutIdx !== 19 ? (
      <Heading
        textColor="white"
        fontSize="9xl"
      >{`${mins}m ${seconds}s`}</Heading>
    ) : (
      <Image
        alt="pose"
        mb={4}
        src={workout_map[workoutType].images[workoutIdx]}
      />
    );
  const workoutName = (
    <Heading
      textColor="white"
      mb={4}
      fontSize="6xl"
    >{`${workout_map[workoutType].names[workoutIdx]}`}</Heading>
  );

  const timeText =
    !restPeriod && workoutIdx !== 19 ? (
      <Text
        textColor="white"
        fontSize="3xl"
      >{`${mins}m ${seconds}s Remaining`}</Text>
    ) : workoutIdx === 19 ? (
      <Text textColor="white" fontSize="3xl">
        Workout Mode will exit in 15 seconds...
      </Text>
    ) : undefined;

  return (
    <VStack>
      {workoutName}
      {workoutImage}

      {timeText}
    </VStack>
  );
}

export default Workout;
