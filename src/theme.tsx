import { extendTheme } from "@chakra-ui/react";
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter",
    mono: "Menlo, monospace",
  },
  fontWeight: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  shadows: {
    purple: "0px 0px 7px 0px #c337c5",
    transparent: "0px 0px 7px 0px transparent",
  },
  colors: {
    primary: {
      50: "#efedff",
      100: "#d0cbea",
      200: "#b1aad6",
      300: "#9288c4",
      400: "#7366b2",
      500: "#594d99",
      600: "#453c78",
      700: "#322b57",
      800: "#1e1936",
      900: "#0a0819",
    },
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },

    secondary: {
      50: "#f1fce2",
      100: "#dcf3bc",
      200: "#c6ea93",
      300: "#afe26a",
      400: "#99d941",
      500: "#80c028",
      600: "#63951d",
      700: "#456b13",
      800: "#284009",
      900: "#0b1600",
    },
    accent: {
      100: "#DE78BF",
    },
  },
  components: {
    DrawerBody: {
      baseStyle: {
        left: "100px",
      },
    },
    Button: {
      variants: {
        secondary: {
          borderColor: "red",
        },
      },
    },

    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        // color: "red",
        fontWeight: "semibold",
      },
    },
    Text: {
      variants: {
        note: {
          fontSize: "sm",
          color: "gray.500",
        },
      },
    },
    // Form: {
    //   baseStyle: {
    //     control: {
    //       marginBottom: "2rem",
    //     },
    //     label: {
    //       marginBottom: "10rem",

    //     },
    //   },
    // },
    FormLabel: {
      fontWeight: "bold",
      color: "red",
    },
    AccordionIcon: {
      baseStyle: {
        fill: "red",
      },
    },

    FormControl: {
      baseStyle: {
        mb: "25rem",
      },
    },
  },
});

export default theme;
