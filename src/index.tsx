import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import "@fontsource/inter/600.css";
import "focus-visible/dist/focus-visible";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store/store";
import theme from "./theme";

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
