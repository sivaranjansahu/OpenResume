import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Box, Image, useRadioGroup, VStack
} from "@chakra-ui/react";
import heading0 from '../../../assets/headingimages/0.png';
import heading1 from '../../../assets/headingimages/1.png';
import heading2 from '../../../assets/headingimages/2.png';
import heading3 from '../../../assets/headingimages/3.png';
import heading4 from '../../../assets/headingimages/4.png';
import heading5 from '../../../assets/headingimages/5.png';
import heading6 from '../../../assets/headingimages/6.png';
import heading7 from '../../../assets/headingimages/7.png';
import { RadioCard } from "./layoutpicker";

  
  
  function HeadingPicker({ setHeadingDesign, ...props }: any) {
      const options = [
          {
              id:0,
              image:heading0
          },
          {
            id:1,
            image:heading1
        },
        {
            id:2,
            image:heading2
        },
        {
            id:3,
            image:heading3
        },
        {
            id:4,
            image:heading4
        },
        {
            id:5,
            image:heading5
        },
        {
            id:6,
            image:heading6
        },
        {
            id:7,
            image:heading7
        },
      ]
    
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: "react",
      onChange: (e: any) => {
        console.log(e);
        setHeadingDesign(parseInt(e));
      },
    });
  
    const group = getRootProps();
  
    return (
      
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Header styles
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack {...group} gridGap={1}>
              {options.map(({id,image}) => {
                const radio = getRadioProps({ value: id });
                return (
                  <RadioCard key={id} {...radio}>
                    {/* {id} */}
                    <Image src={image}/>
                  </RadioCard>
                );
              })}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      
    );
  
  }
  
  export default HeadingPicker;
  