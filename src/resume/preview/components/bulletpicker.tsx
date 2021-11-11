import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

type propType = {
  setBullet: Function;
  format: string;
};

function BulletPicker({ setBullet, format }: propType) {
  const bulletsList = [
    "◽",
    "▶",
    "▷",
    "▸",
    "▹",
    "◉",
    "◈",
    "◻",
    "◼",
    "★",
    "☆",
    "⚪",
    "⚫",
    "⚬",
    "•",
    "–",
    "―",
    "𑁍",
  ];

  function updateBullet(bullet: string, index: number) {
    setBullet(bullet);
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Bullets
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {bulletsList.map((bullet: string, index: number) => {
          return (
            //font.replaceAll(" ", "").toLowerCase()
            <>
              <Button
                onClick={() => updateBullet(bullet, index)}
                variant="ghost"
              >
                {bullet}
              </Button>
              {/* <Image
                  onClick={() => updateBullet(bullet, index)}
                  borderWidth={3}
                  m={1}
                  h={10}
                  borderStyle="solid"
                  borderColor={
                    fontIndex === index ? "primary.400" : "transparent"
                  }
                  _hover={{
                    borderColor: "secondary.400",
                    cursor: "pointer",
                  }}
                  src={fontImages[font.replaceAll(" ", "").toLowerCase()]}
                /> */}
            </>
          );
        })}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default BulletPicker;
