import { DragHandleIcon } from "@chakra-ui/icons";
import { Container } from "@chakra-ui/layout";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable,} from "react-beautiful-dnd";
import update from 'immutability-helper'

let months = [
  {
    index: 0,
    title: "jan",
  },
  {
    index: 1,
    title: "feb",
  },
  {
    index: 2,
    title: "mar",
  },
  {
    index: 3,
    title: "apr",
  },
];

export default function Tracker() {
  const [list,setList] = useState([
    {
      index: 0,
      title: "jan",
      cat:1
    },
    {
      index: 1,
      title: "feb",
      cat:1
    },
    {
      index: 2,
      title: "mar",
      cat:2
    },
    {
      index: 3,
      title: "apr",
      cat:2
    },
  ])
  return (
    <Container width="100%" maxW="1400px" mx="auto" h="100vh">
      <Box as="section" pt={10}>
        <Flex mb={16} justifyContent="space-between">
          <Heading size="lg">Learn</Heading>
        </Flex>
        <DragDropContext
          onDragEnd={(params) => {
            console.log(params)
            const srcI = params.source.index;
            const destI = params.destination?.index||0;
            let newList = [...list];
            newList.splice(destI,0,newList.splice(srcI,1)[0]);
            //list.splice(destI,0,list.splice(srcI,1)[0]);
            // list[srcI].index = destI;
            // list[destI].index = srcI;
            //console.log(newList)
            setList(newList);
            // setList(update(list,{
            //   $splice:[
            //     [srcI,1],
            //     [destI,0,list[srcI]]
            //   ]
            // }))

            console.log(list)
            // setList(list=>{
            //   return newList
            // })
          }}
        >
          <Box bg="gray.300">
          <Droppable droppableId="d1">
            
              {(provided, snapshot) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {list.filter(m=>m.cat===1).map((m, i) => {
                    return (
                      <Draggable key={i} draggableId={`drag${i}`} index={i}>
                        {(provided,snapshot)=>(
                          <li key={i} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          {m.title}
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </ul>
                
              )}
              
            </Droppable>
            </Box>
            <Box bg="gray.500">
            <Droppable droppableId="d2">
            {(provided, snapshot) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {list.filter(m=>m.cat===2).map((m, i) => {
                    return (
                      <Draggable key={i} draggableId={`drag${i}`} index={i}>
                        {(provided,snapshot)=>(
                          <li key={i} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          {m.title}
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </ul>
                
              )}
            </Droppable>
            </Box>
        </DragDropContext>
      </Box>
    </Container>
  );
}
