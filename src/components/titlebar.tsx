import { Flex } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  VscChromeClose, VscChromeMaximize, VscChromeMinimize,
  VscChromeRestore
} from "react-icons/vsc";
import { channels } from "../shared/constants";

const electron = window.require("electron");

export default function TitleBar() {
  const [maximized, setMaximized] = useState(false);

  const close = function () {
    electron.ipcRenderer.send(channels.CLOSE_WINDOW);
  };
  const maximize = function () {
    electron.ipcRenderer.send(channels.MAXIMIZE_WINDOW);
    setMaximized((maximized) => {
      return !maximized;
    });
    console.log("maximized", maximized);
  };
  const minimize = function () {
    electron.ipcRenderer.send(channels.MINIMIZE_WINDOW);
  };
  const toggleMax = function () {
    // electron.ipcRenderer.send(channels.TOGGLE_MAXIMIZE);
    // setMaximized(maximized=>{
    //     return !maximized
    // })
    // console.log("maximized",maximized)
  };

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      px={4}
      onDoubleClick={toggleMax}
      className="titlebar"
      color="primary.400"
    >
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          SympleCV
        </Text>
      </Flex>
      <Flex alignItems="center" gridGap={4}>
        <Icon as={VscChromeMinimize} boxSize={6} onClick={minimize} />

        {maximized ? (
          <Icon as={VscChromeRestore} boxSize={6} onClick={toggleMax} />
        ) : (
          <Icon as={VscChromeMaximize} boxSize={6} onClick={maximize} />
        )}
        <Icon as={VscChromeClose} boxSize={6} onClick={close} />
      </Flex>
    </Flex>
  );
}
