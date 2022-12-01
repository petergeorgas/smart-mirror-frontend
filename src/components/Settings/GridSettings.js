import React from 'react'
import {
    Center,
    Box,
    VStack,
    HStack,
    Input,
    Button,
    Heading,
    Flex,
    Spacer,
    Checkbox,
    Switch,
    FormControl,
    SimpleGrid,
    FormLabel,
    Text,
    Select
  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getUser, updateUserLayout } from "../../firebase/firebase";

const componentMap = {
    clock: "Clock",
    cat: "Cat Images",
    compliment: "Compliment Generator",
    calendar: "Calendar",
    map: "Destination ",
    schedules: "Football Schedule",
    default: "None"
  };

const GridSettings = (props) => {
    const { uid } = props;

    const [CurrentSelection, setCurrentSelection] = useState(undefined);
    const [SelectedGrid, setSelectedGrid] = useState(undefined);

    const [boxes, setBoxes] = useState([
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",
        "default",     
      ]);
    
      useEffect(() => {
        if (uid) {
          getUser(uid).then((user) => {
            console.log(user.layout);
            if(user.layout == null){
                updateUserLayout(uid, boxes);
            }else{
                setBoxes(user.layout);
            }
          });
        }
      }, [uid]);

const onBoxClick = (item, i) => {
    if(SelectedGrid == i){
        setCurrentSelection('')
        setSelectedGrid('')
    } else {
        setCurrentSelection(componentMap[item])
        setSelectedGrid(i)
    }
}


const onSelectionClick = (itemKey, i) => {
    console.log(itemKey, i);
    console.log(boxes)
    const boxCopy = boxes; 
    boxCopy[SelectedGrid] = i
    setBoxes(boxCopy);
    console.log(boxes)
    updateUserLayout(uid, boxes)
    // This is where update DB with change
    setCurrentSelection('')
    setSelectedGrid('')
}

const ComptSelector = (
<Select placeholder={CurrentSelection} size='lg' onChange={(e) => onSelectionClick(SelectedGrid, e.target.value)}>
    {Object.keys(componentMap).map((key) => {
        if(CurrentSelection == componentMap[key])
        return
        else
        return <option value={key}>{componentMap[key]}</option>
    }  
    )}
</Select>
)

const components = boxes.map((item, i) => {
    if (item === "default") {
        return <Box borderColor={ SelectedGrid === i ? "blue" : ""} 
                border={ SelectedGrid === i  ? "2px" : ""} 
                key={i} bg="tomato" h="200px" onClick={() => onBoxClick(item, i)}></Box>;
    } else {
        return (
        <Box borderColor={ SelectedGrid === i ? "blue" : ""} 
            border={ SelectedGrid === i  ? "2px" : ""}
            key={i} bg="tomato" h="200px" onClick={() => onBoxClick(item, i)} >
            <Center h="100%" >{componentMap[item]}</Center>
        </Box>
        );
    }
    });
    
  return (
    <div>
        <Center>
        Click a grid location to change the component
        </Center>
        <SimpleGrid columns={3} spacing={1}>
            {components}
        </SimpleGrid>
        {(SelectedGrid != '') && (
            ComptSelector
        )}

    </div>
  )
}

export default GridSettings