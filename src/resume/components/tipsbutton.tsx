import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, Box } from "@chakra-ui/layout";
import { Text,Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import { VscClose } from "react-icons/vsc";
import {HiOutlineLightBulb} from "react-icons/hi"
import {tips} from '../../shared/tipscontent'

type proptype = {
    // onOpen:any,
    // onClose:any,
    // isOpen:boolean,
    sectionName:string,
    title:string

}
export default function TipsButton(props:proptype){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {sectionName} = props;
    const tipsContent = (tips as any)[sectionName];
    return (
        <>
        <Button leftIcon={<HiOutlineLightBulb/>} size="sm" onClick={() => isOpen ? onClose() : onOpen()}>Writing tips</Button>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" px={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{sectionName} Tips</Text>
              <Box onClick={onClose} _hover={{ cursor: "pointer", color: "red" }}>
                <Icon as={VscClose} />
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={4}>
              {tipsContent && tipsContent.map((t:string,i:number)=>{
                  return <Box key={i} 
                  borderBottomColor="gray.200" 
                  borderBottomWidth={0.2}
                  py={4}>{t}</Box>
              })}
          </DrawerBody>
          </DrawerContent>
          </Drawer>
        </>
    )
}