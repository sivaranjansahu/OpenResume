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
    primary:{
      100:"#6B5EAE"
    },
    secondary:{
      100:"#4CC2FA"
    },
    accent:{
      100:"#DE78BF"
    }
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
        // color: "red",
        fontWeight:"semibold"
      },
    },
    Text:{
      variants:{
        note:{
          fontSize:"sm",
          color:"gray.500"
        }
      }
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
      color:"red"
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
