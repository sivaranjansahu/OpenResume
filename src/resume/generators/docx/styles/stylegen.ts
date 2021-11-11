import { AlignmentType, ShadingType } from "docx";
import { configProps } from "../docxgen";

export default function styleGenerator(config: configProps) {
  const runSettings = {
    style1: {
      id: "Heading1",
      name: "Heading 1",
      spacing: {
        before: 300,
        after: 0,
      },
      run: {
        size: 28,
        color: config.colorScheme.headerColor,
        font: config.headerFont,
        bold: true,
      },
    },
    style2: {
      id: "Heading1",
      name: "Heading 1",
      spacing: {
        before: 300,
        after: 200,
      },
      run: {
        size: 22,
        allCaps: true,
        characterSpacing: 20,
        color: config.colorScheme.headerColor,
        font: config.headerFont,
        bold: true,
      },
    },
    style3: {
      id: "Heading1",
      name: "Heading 1",
      spacing: {
        before: 300,
        after: 200,
      },
      run: {
        size: 28,
        color: config.colorScheme.headerColor,
        font: config.headerFont,
        bold: true,
      },
    },
    style4: {
      id: "Heading1",
      name: "Heading 1",
      spacing: {
        before: 300,
        after: 200,
      },
      run: {
        size: 28,
        color: config.colorScheme.headerColor,
        font: config.headerFont,
        bold: true,
      },
    },
    style5: {
      id: "Heading1",
      name: "Heading 1",
      spacing: {
        before: 300,
        after: 200,
      },
      run: {
        size: 22,
        allCaps: true,
        characterSpacing: 20,
        color: config.colorScheme.headerColor,
        font: config.headerFont,
        bold: true,
      },
    },
  } as any;

  const headerOptions = {
    style1: {
      border: {
        top: {
          color: config.colorScheme.headerColor || "hsl(200,50,50)",
          space: 2,
          value: "single",
          size: 20,
        },
      },
    },
    style2: {
      alignment: AlignmentType.CENTER,
      shading: {
        type: ShadingType.SOLID,
        color: config.colorScheme.shadingColor,
        fill: config.colorScheme.shadingColor,
      },
      border: {
        top: {
          color: config.colorScheme.shadingColor,
          space: 3,
          value: "single",
          size: 3,
        },
        bottom: {
          color: config.colorScheme.shadingColor,
          space: 3,
          value: "single",
          size: 3,
        },
      },
    },
    style3: {
      border: {
        top: {
          color: config.colorScheme.headerColor,
          space: 2,
          value: "single",
          size: 2,
        },
        bottom: {
          color: config.colorScheme.headerColor,
          space: 2,
          value: "single",
          size: 2,
        },
      },
    },
    style4: {
      alignment: AlignmentType.CENTER,
      border: {
        top: {
          color: config.colorScheme.headerColor,
          space: 4,
          value: "single",
          size: 2,
        },
        bottom: {
          color: config.colorScheme.headerColor,
          space: 4,
          value: "single",
          size: 2,
        },
      },
    },
    style5: {
      allCaps: true,
    },
    style6: {},
  } as any;

  const subHeaderOptions = {
    style1: {
      title: {
        bold: true,
        size: 22,
      },
      subTitle: {
        bold: false,
        color: "555555",
        italics: true,
        size: 22,
      },
      rightMeta: {
        color: "555555",
        italics: true,
        break: 0,
        size: 22,
      },
    },
  } as any;
  return {
    runSettings: runSettings[config.headerstyle],
    otherStyles: headerOptions[config.headerstyle],
    subHeaderOptions: subHeaderOptions[config.subHeaderStyle],
  };
}
