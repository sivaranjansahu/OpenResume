import { Box, Flex } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import { channels } from "../shared/constants";
import {
    VscChromeMaximize,
    VscChromeClose,
    VscChromeMinimize,
    VscChromeRestore
  } from "react-icons/vsc";
import { useState } from "react";


const electron = window.require("electron");


export default function TitleBar(){

    const [maximized,setMaximized] = useState(false);
    
    const close = function() {
        electron.ipcRenderer.send(channels.CLOSE_WINDOW);
    }
    const maximize = function() {
        electron.ipcRenderer.send(channels.MAXIMIZE_WINDOW);
        setMaximized(maximized=>{
            return !maximized
        })
        console.log("maximized",maximized)
    }
    const minimize = function() {
        electron.ipcRenderer.send(channels.MINIMIZE_WINDOW);
    }
    const toggleMax = function() {
        // electron.ipcRenderer.send(channels.TOGGLE_MAXIMIZE);
        // setMaximized(maximized=>{
        //     return !maximized
        // })
        // console.log("maximized",maximized)
        
    }

    return(
        <Flex as="header" justifyContent="space-between" px={4} bg="blue.800" onDoubleClick={toggleMax}
        className="titlebar"
        >
            <Flex alignItems="center">
                <Text>Menu</Text>
                <h5 >Titlename</h5>
            </Flex>
            <Flex alignItems="center" gridGap={4}>
                <Icon as={VscChromeMinimize} boxSize={6} onClick={minimize}/>
                
                {
                    maximized ? <Icon as={VscChromeRestore} boxSize={6} onClick={toggleMax}/> : <Icon as={VscChromeMaximize} boxSize={6} onClick={maximize}/>
                }
                <Icon as={VscChromeClose} boxSize={6} onClick={close}/>
            </Flex>
        </Flex>
    )
}