import { GetItems } from "visual/editorComponents/EditorComponent/types";
import Config from "visual/global/Config";
import { getEkklesiaChoiches } from "visual/utils/api/common";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import { toolbarParentColors } from "../toolbarParent";
import { Props, Value } from "./types";

// @ts-expect-error advancedSettings is old option
export const getItems: GetItems<Value, Props> = ({
  v,
  device,
  state,
  component,
  context
}) => {
  const config = Config.getAll();

  const dvv = (key: string) => defaultValueValue({ v, key, device });

  return [
    {
      id: "toolbarGroupList",
      type: "popover",
      config: {
        icon: "t2-group-list",
        title: t("Group List")
      },
      position: 60,
      options: [
        {
          id: "tabsCurrentElement",
          type: "tabs",
          config: {
            saveTab: true
          },
          tabs: [
            {
              id: "tabSettings",
              label: t("Settings"),
              options: [
                {
                  id: "category",
                  devices: "desktop",
                  label: t("Category"),
                  type: "select",
                  choices: getEkklesiaChoiches(config, {
                    key: "smallgroup"
                  })
                },
                {
                  id: "group",
                  devices: "desktop",
                  label: t("Group"),
                  type: "select",
                  choices: getEkklesiaChoiches(config, {
                    key: "groups"
                  })
                }
              ]
            },
            {
              id: "tabColumns",
              label: t("Columns"),
              options: [
                {
                  id: "itemsNumber",
                  label: t("Items"),
                  type: "number-dev",
                  devices: "desktop",
                  config: {
                    min: 1,
                    max: 20,
                    spinner: true
                  }
                },
                {
                  id: "columnNumber",
                  label: t("Columns"),
                  type: "number-dev",
                  config: {
                    min: 1,
                    max: 6,
                    spinner: true
                  }
                }
              ]
            },
            {
              id: "tabGroupList",
              label: t("Display"),
              options: [
                {
                  id: "showImages",
                  label: t("Images"),
                  type: "switch",
                  devices: "desktop"
                },
                {
                  id: "showCategory",
                  type: "switch",
                  label: t("Category"),
                  devices: "desktop"
                },
                {
                  id: "showGroup",
                  type: "switch",
                  label: t("Group"),
                  devices: "desktop"
                },
                {
                  id: "showCoordinator",
                  type: "switch",
                  label: t("Coordinator"),
                  devices: "desktop"
                },
                {
                  id: "showPreview",
                  type: "switch",
                  label: t("Preview"),
                  devices: "desktop"
                },
                {
                  id: "showPagination",
                  type: "switch",
                  label: t("Pagination"),
                  devices: "desktop"
                },
                {
                  id: "showDay",
                  type: "switch",
                  label: t("Day"),
                  devices: "desktop"
                },
                {
                  id: "showTimes",
                  type: "switch",
                  label: t("Times"),
                  devices: "desktop"
                },
                {
                  id: "showStatus",
                  type: "switch",
                  label: t("Status"),
                  devices: "desktop"
                },
                {
                  id: "showChildcare",
                  type: "switch",
                  label: t("Childcare"),
                  devices: "desktop"
                },
                {
                  id: "showResourceLink",
                  type: "switch",
                  label: t("Resource Link"),
                  devices: "desktop"
                }
              ]
            },
            {
              id: "page",
              label: t("Page"),
              options: [
                {
                  id: "detailPage",
                  type: "internalLink",
                  label: t("Item"),
                  devices: "desktop",
                  config: {
                    helper:
                      "URL of group detail page. If used will add a link to the heading to take the user to the group detail page. Requires the 'Group Detail' widget to be placed on a page and that page url/slug placed in this field ."
                  }
                },
                {
                  id: "detailPageButtonText",
                  type: "inputText",
                  devices: "desktop",
                  label: t("Button Text"),
                  disabled: !dvv("detailPage"),
                  placeholder: t("Button Text..."),
                  helper: {
                    content: t(
                      "Button will display if text is entered and a detail page selected."
                    )
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    ...toolbarParentColors<Value, Props>({
      v,
      device,
      state,
      component,
      context
    }),
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
          id: "itemSpacing",
          label: t("Spacing"),
          type: "slider",
          config: {
            min: 0,
            max: 100,
            units: [{ value: "px", title: "px" }]
          }
        },
        {
          id: "grid",
          type: "grid",
          config: {
            separator: true
          },
          columns: [
            {
              id: "col-1",
              options: [
                {
                  id: "styles",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "styles",
                    text: t("Styling"),
                    icon: "nc-cog"
                  }
                }
              ]
            },
            {
              id: "col-2",
              options: [
                {
                  id: "effects",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "effects",
                    text: t("Effects"),
                    icon: "nc-flash"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "horizontalAlign",
      type: "toggle",
      disabled: true,
      choices: []
    },
    {
      id: "advancedSettings",
      type: "legacy-advancedSettings",
      disabled: true
    },
    {
      id: "itemHorizontalAlign",
      type: "toggle",
      position: 80,
      choices: [
        { icon: "nc-text-align-left", title: t("Align"), value: "left" },
        { icon: "nc-text-align-center", title: t("Align"), value: "center" },
        { icon: "nc-text-align-right", title: t("Align"), value: "right" }
      ]
    }
  ];
};
