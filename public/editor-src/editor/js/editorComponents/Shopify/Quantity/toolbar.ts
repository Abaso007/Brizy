import { GetItems } from "visual/editorComponents/EditorComponent/types";
import { getColorToolbar } from "visual/utils/color";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import { Value } from "./types";

export const getItems: GetItems<Value> = ({ v, device }) => {
  const dvv = (key: string) =>
    defaultValueValue({ v, key, device, state: "normal" });

  const bgColor = getColorToolbar(
    dvv("bgColorPalette"),
    dvv("bgColorHex"),
    dvv("bgColorOpacity")
  );

  return [
    {
      id: "toolbarCart",
      type: "popover",
      config: {
        size: "auto",
        title: t("Product"),
        icon: "nc-woo-add-to-cart"
      },
      devices: "desktop",
      position: 90,
      options: [
        {
          id: "itemId",
          label: "Select product",
          type: "select",
          config: {
            search: true
          },
          choices: [
            {
              value: "841851",
              title: "841851"
            }
          ]
        }
      ]
    },
    {
      id: "toolbarTypography",
      type: "popover",
      config: {
        icon: "nc-font",
        size: device === "desktop" ? "large" : "auto",
        title: t("Typography")
      },
      position: 70,
      options: [
        {
          id: "",
          type: "typography",
          config: {
            fontFamily: device === "desktop"
          }
        }
      ]
    },
    {
      id: "toolbarColor",
      type: "popover",
      config: {
        size: "auto",
        title: t("Colors"),
        icon: {
          style: {
            backgroundColor: bgColor
          }
        }
      },
      position: 80,
      devices: "desktop",
      options: [
        {
          id: "tabsColor",
          type: "tabs",
          tabs: [
            {
              id: "tabBg",
              label: t("Bg"),
              options: [
                {
                  id: "bgColor",
                  type: "colorPicker",
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabText",
              label: t("Text"),
              options: [
                {
                  id: "color",
                  type: "colorPicker",
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabBorder",
              label: t("Border"),
              options: [
                {
                  id: "border",
                  type: "border",
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabBoxShadow",
              label: t("Shadow"),
              options: [
                {
                  id: "boxShadow",
                  type: "boxShadow",
                  states: [NORMAL, HOVER]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarSettings",
      type: "popover",
      config: {
        icon: "nc-cog",
        title: t("Settings")
      },
      position: 110,
      options: [
        {
          id: "width",
          label: t("Width"),
          type: "slider",
          position: 100,
          config: {
            min: 1,
            max: dvv("widthSuffix") === "px" ? 1000 : 100,
            units: [
              { value: "%", title: "%" },
              { value: "px", title: "px" }
            ]
          }
        },
        {
          id: "advancedSettings",
          type: "advancedSettings",
          label: t("More Settings"),
          devices: "desktop",
          position: 110
        }
      ]
    }
  ];
};
