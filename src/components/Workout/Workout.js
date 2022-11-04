import './Workout.css';
import { useEffect } from 'react';
import React from 'react';
import prettyMilliseconds from 'pretty-ms';
// Exercises
import push_up from './Exercises/push_up_gif.gif';
import arm_circles from './Exercises/arm_circles_gif.gif';
import jumping_jack from './Exercises/jumping_jack_gif.gif';
import lunges from './Exercises/lunges_gif.gif';
import squat from './Exercises/squat_gif.gif';
import burpees from './Exercises/burpees_gif.gif';
import situp from './Exercises/sit_up_gif.gif';
import crunches from './Exercises/crunches_gif.gif';
import kneepushup from './Exercises/knee_push_up_gif.gif';
import vsitbicycles from './Exercises/v_sit_bicycles_gif.gif';
import rollup from './Exercises/roll_up_gif.gif';
import sprintercrunch from './Exercises/sprinter_crunch_gif.gif';
import russiantwist from './Exercises/russian_twist_gif.gif';
import boattwist from './Exercises/boat_twist_gif.gif';
import kneehug from './Exercises/knee_hug_gif.gif';
import vsit from './Exercises/v_sit_gif.gif';
import vup from './Exercises/v_up_gif.gif';
import breaktime from './Exercises/break_time_gif.gif';
import crisscross from './Exercises/criss_cross_crunches_gif.gif';
import rest from './Exercises/rest_time_gif.gif';
import pose_1 from './Exercises/upward salute.png';
import pose_2 from './Exercises/upward_salute_side_bend.png';
import pose_3 from './Exercises/tree.png';
import pose_4 from './Exercises/lord_of_the_dance.png';
import pose_5 from './Exercises/warrior_i.png';
import pose_6 from './Exercises/warrior_iii.png';
import pose_7 from './Exercises/extended_tabletop.png';
import pose_8 from './Exercises/upward_facing_dog.png';
import pose_9 from './Exercises/downward_facing_dog.png';
import pose_10 from './Exercises/seated_forward_bend.png';
import goodjob from './Exercises/good_job_gif.gif'


function App() {
  const time_interval = 150000;   // 2.5 min interval
  const rest_time = 15000;      // 15 sec rest time
  // => 30 min workout time
  var current_time = time_interval; // Track current time left in the workout
  const general_workout = [arm_circles, rest, jumping_jack, rest, lunges, rest, squat, rest, push_up, breaktime, burpees, rest, situp, rest, crunches, rest, kneepushup, rest, 
    crisscross];
  const general_workout_names = ['Arm Circles', 'Rest Time', 'Jumping Jacks', 'Rest Time','Lunges', 'Rest Time','Squats', 'Rest Time','Push Ups', 'Break Time', 'Burpees', 'Rest Time',
    'Sit Ups', 'Rest Time','Crunches', 'Rest Time','Knee Push Ups', 'Rest Time','Criss Cross Crunches'];
  const general_workout_cal_burned = [];
  const core_workout = [situp, rest, crunches, rest, vsitbicycles, rest, rollup, rest, sprintercrunch, breaktime, russiantwist, rest, boattwist, rest, kneehug, rest, vsit, 
    rest, vup];
  const core_workout_names = ['Sit Ups', 'Rest Time', 'Crunches', 'Rest Time', 'V Sit Bicycles', 'Rest Time', 'Roll Ups', 'Rest Time', 'Sprinter Crunches', 'Break Time', 
    'Russian Twists', 'Rest Time', 'Boat Twists', 'Rest Time', 'Knee Hugs', 'Rest Time', 'V Sits', 'Rest Time', 'V Ups'];
  const yoga_poses = [pose_1, rest, pose_2, rest, pose_3, rest, pose_4, rest, pose_5, breaktime, pose_6, rest, pose_7, rest, pose_8, rest, pose_9, rest, pose_10];
  const yoga_poses_names = ['Upward Salute', 'Rest Time', 'Upward Salute Side Bend', 'Rest Time', 'Tree', 'Rest Time', 'Lord of the Dance', 'Rest Time', 'Warrior I', 'Break Time',
    'Warrior III', 'Rest Time', 'Extended Tabletop', 'Rest Time', 'Upward Facing Dog', 'Rest Time', 'Downward Facing Dog', 'Rest Time', 'Seated Forward Bend']
  const [duaration, setDuration] = React.useState("Workout Starting");
  var imageNum = 0;
  var workout_over = false;
  var rest_bool = false;

  // Parameters that will need to be passed in
  // var current_workout = general_workout;
  // var current_workout_names = general_workout_names;
  var current_workout = core_workout;
  var current_workout_names = core_workout_names;
  // var current_workout = yoga_poses;
  // var current_workout_names = yoga_poses_names;

  const [text, setText] = React.useState("Workout " + (imageNum + 1) + "/" + Math.round(current_workout.length / 2) + " " + current_workout_names[imageNum]);
  const [image, setImage] = React.useState(current_workout[imageNum]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current_time === 0){
        rest_bool = true;
        if(imageNum < (current_workout.length - 2)) {  // Next interval so next workout
          setDuration("Prepare For Next Workout");
          imageNum = imageNum + 1;
          setImage(current_workout[imageNum]);
          if (current_workout_names[imageNum] === 'Rest Time'){
            setText(current_workout_names[imageNum]);
            rest_bool = true;
            current_time = rest_time;
          }
          else{
            setText("Workout " + (Math.floor(imageNum/2) + 1) + "/" + Math.round(current_workout.length / 2) + " " + current_workout_names[imageNum]);
            current_time = time_interval;
          }
        }
        else {  //Workput is complete
          setText("Workout Complete. Nice Work!");
          setDuration(undefined);
          workout_over = true;
          setImage(goodjob);
        }
      }
      if (workout_over === false){
        if(!rest_bool)
          setDuration(prettyMilliseconds(current_time));
        current_time = current_time - 1000;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          { text }
        </p>
        <img src={image} className="App-logo" />
        <p>
          { duaration }
        </p>
      </header>
    </div>
  );
}

export default App;
