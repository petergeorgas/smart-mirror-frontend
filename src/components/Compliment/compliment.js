import { useEffect } from "react";
import React from "react";
import { Text } from "@chakra-ui/react";

const compliments = [
  "You look great today.",
  "Nice style.",
  "You have the best laugh.",
  "You are the most perfect you there is.",
  "You're strong.",
  "You light up the room.",
  "You should be proud of yourself.",
  "You have a great sense of humor.",
  "You've got all the right moves!",
  "Is that your picture next to “charming” in the dictionary?",
  "Your kindness is a balm to all who encounter it.",
  "On a scale from 1 to 10, you're an 11.",
  "You're like sunshine on a rainy day.",
  "How is it that you always look great, even in sweatpants?",
  "Everything would be better if more people were like you!",
  "That color is perfect on you.",
  "You're wonderful.",
  "Your hair looks stunning.",
  "You should be thanked more often, So thank you!!",
  "You have the best ideas.",
  "You're a candle in the darkness.",
  "Who raised you? They deserve a medal for a job well done.",
  "You're like a breath of fresh air.",
  "You're gorgeous!",
  "Any team would be lucky to have you on it.",
  "You're someone's reason to smile.",
  "You're even better than a unicorn, because you're real.",
  "You're really something special.",
  "You're a gift to those around you.",
  "You are more fun than anyone or anything, including bubble wrap.",
  "You are the most perfect you there is.",
  "You are enough.",
  "You are one of the strongest people I know.",
  "You look great today.",
  "You have the best smile.",
  "Your outlook on life is amazing.",
  "You just light up the room.",
  "You make a bigger impact than you realize.",
  "You are always so helpful.",
  "You have the best laugh.",
  "You just glow.",
  "You bring out the best in everyone.",
  "You inspire people.",
  "Nothing can stop you.",
  "You are an excellent friend.",
  "You have the best sense of style.",
  "You look so young!",
  "I hope you are proud of yourself, because you should be!",
  "You are one of the bravest people around.",
  "That color looks perfect on you.",
  "Everything seems brighter when you are around.",
  "Even the things you don't like about yourself make you interesting.",
  "You are stunning.",
]

function Compliment() {
  const [compliment, setCompliment] = React.useState("");
  useEffect(() => {
    const complimentNum = Math.floor(Math.random() * compliments.length);
    setCompliment(compliments[complimentNum]);
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
