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
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  components: {
    DrawerBody: {
      baseStyle: {
        left: "100px",
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
        fontWeight: "600",
      },
    },
    AccordionIcon: {
      baseStyle: {
        fill: "red",
      },
    },

    FormControl: {
      baseStyle: {
        mb: "5rem",
      },
    },
  },
});

export default theme;
