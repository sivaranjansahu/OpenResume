import {
    Font
} from "@react-pdf/renderer";
import InterBold from "./Inter/Inter-Bold.ttf";
import InterMedium from "./Inter/Inter-Medium.ttf";
import InterRegular from "./Inter/Inter-Regular.ttf";
import KohBold from "./koh/KohSantepheap-Black.ttf";
import KohMedium from "./koh/KohSantepheap-Bold.ttf";
import KohRegular from "./koh/KohSantepheap-Regular.ttf";
import OpenSansBold from "./OpenSans/OpenSans-Bold.ttf";
import OpenSansMedium from "./OpenSans/OpenSans-Medium.ttf";
import OpenSansRegular from "./OpenSans/OpenSans-Regular.ttf";
import QuicksandBold from "./Quicksand/Quicksand-Bold.ttf";
import QuicksandMedium from "./Quicksand/Quicksand-Medium.ttf";
import QuicksandRegular from "./Quicksand/Quicksand-Regular.ttf";
import RobotoBold from "./Roboto/Roboto-Bold.ttf";
import RobotoMedium from "./Roboto/Roboto-Medium.ttf";
import RobotoRegular from "./Roboto/Roboto-Regular.ttf";
import LoraRegular from './Lora/Lora-Regular.ttf';
import LoraMedium from './Lora/Lora-Medium.ttf';
import LoraBold from './Lora/Lora-Bold.ttf';
import LoraItalic from './Lora/Lora-Italic.ttf'

import LatoRegular from './Lato/Lato-Light.ttf';
import LatoMedium from './Lato/Lato-Regular.ttf';
import LatoBold from './Lato/Lato-Bold.ttf';
import LatoItalic from './Lato/Lato-Italic.ttf'


function registerFonts() {
  Font.register({
    family: "koh",
    fonts: [
      { src: KohRegular, fontWeight: 400 },
      { src: KohMedium, fontWeight: 500 },
      { src: KohBold, fontWeight: 700 },
    ],
  });

  Font.register({
    family: "inter",
    fonts: [
      { src: InterRegular, fontWeight: 400 },
      { src: InterMedium, fontWeight: 500 },
      { src: InterBold, fontWeight: 700 },
    ],
  });

  Font.register({
    family: "opensans",
    fonts: [
      { src: OpenSansRegular, fontWeight: 400 },
      { src: OpenSansMedium, fontWeight: 500 },
      { src: OpenSansBold, fontWeight: 700 },
      {
        src:require('./OpenSans/OpenSans-Italic.ttf'),
        fontWeight:400,
        fontStyle:'italic'
      },
    ],
  });

  Font.register({
    family: "quicksand",
    fonts: [
      { src: QuicksandRegular, fontWeight: 400 },
      { src: QuicksandMedium, fontWeight: 500 },
      { src: QuicksandBold, fontWeight: 700 },
    ],
  });

  Font.register({
    family: "roboto",
    fonts: [
      { src: RobotoRegular, fontWeight: 400 },
      { src: RobotoMedium, fontWeight: 500 },
      { src: RobotoBold, fontWeight: 700 },
    ],
  });

  Font.register({
    family:'lora',
    fonts:[
      {
        src:LoraRegular,
        fontWeight:400
      },
      {
        src:LoraMedium,
        fontWeight:500
      },
      {
        src:LoraBold,
        fontWeight:600
      },
      {
        src:LoraItalic,
        fontWeight:400,
        fontStyle:"italic"
      },
    ]
  })

  
Font.register({
  family:'lato',
  fonts:[
    {
      src:LatoRegular,
      fontWeight:400
    },
    {
      src:LatoMedium,
      fontWeight:500
    },
    {
      src:LatoBold,
      fontWeight:600
    },
    {
      src:LatoItalic,
      fontWeight:400,
      fontStyle:"italic"
    },
  ]
})
} 


export default registerFonts;