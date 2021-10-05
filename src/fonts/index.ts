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
}

export default registerFonts;