import type { GetItems } from "visual/editorComponents/EditorComponent/types";
import { getColorToolbar } from "visual/utils/color";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import {
  containerSelector,
  popupBlockButtonsWrapSelectorMobile,
  popupBlockButtonsWrapSelectorMobile2,
  popupBlockWrapSelectorMobile,
  popupSelectorMobile
} from "./css/selectors";
import { Value } from "./types";

export const getItems: GetItems<Value> = ({ v, device, state }) => {
  const dvv = (key: string) => defaultValueValue({ v, key, device, state });

  const parentBgColor = getColorToolbar(
    dvv("parentBgColorPalette"),
    dvv("parentBgColorHex"),
    dvv("parentBgColorOpacity")
  );

  return [
    {
      id: "toolbarCurrentElement",
      type: "popover",
      config: { title: t("Search"), icon: "nc-search" },
      position: 10,
      devices: "desktop",
      options: [
        {
          id: "sidebarAlign",
          label: t("Sidebar align"),
          type: "select",
          choices: [
            { title: t("Left"), value: "LEFT" },
            { title: t("Right"), value: "RIGHT" }
          ]
        },
        {
          id: "footerDisplay",
          label: t("Footer"),
          type: "switch"
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
            backgroundColor: parentBgColor
          }
        }
      },
      devices: "desktop",
      position: 20,
      options: [
        {
          id: "parent",
          type: "backgroundColor",
          selector: `${containerSelector}, ${popupSelectorMobile}, ${popupBlockWrapSelectorMobile}, ${popupBlockButtonsWrapSelectorMobile}, ${popupBlockButtonsWrapSelectorMobile2}`
        }
      ]
    },
    {
      id: "advancedSettings",
      type: "advancedSettings",
      devices: "desktop",
      position: 30,
      title: t("Settings")
    },
    {
      id: "horizontalAlign",
      type: "toggle",
      disabled: true,
      choices: []
    }
  ];
};
