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

function App() {
  const time_interval = 5000;   // 5 min interval
  var current_time = time_interval; // Track current time left in the workout
  const imageArray = [arm_circles, jumping_jack, lunges, squat, push_up, burpees, situp, crunches, kneepushup];
  const imageNameArray = ['Arm Circles', 'Jumping Jacks', 'Lunges', 'Squats', 'Push Ups', 'Burpees', 'Sit Ups', 'Crunches', 'Knee Push Ups'];
  var imageNum = 0;
  const [image, setImage] = React.useState(imageArray[imageNum]);
  const [text, setText] = React.useState("Workout " + (imageNum + 1) + "/" + imageArray.length + " " + imageNameArray[imageNum]);
  const [duaration, setDuration] = React.useState("Workout Starting");
  var workout_over = false;

  useEffect(() => {
    const interval = setInterval(() => {
      if (workout_over === false){
        setDuration(prettyMilliseconds(current_time));
        current_time = current_time - 1000;
      }
      if (current_time === -1000){
        if(imageNum < (imageArray.length - 1)) {  // Next interval so next workout
          setDuration("Next Workout");
          imageNum = imageNum + 1;
          setImage(imageArray[imageNum]);
          setText("Workout " + (imageNum + 1) + "/" + imageArray.length + " " + imageNameArray[imageNum]);
          current_time = time_interval;
        }
        else {  //Workput is complete
          setText("Workout Complete. Nice Work!");
          setImage(undefined);
          setDuration(undefined);
          workout_over = true;
        }
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
