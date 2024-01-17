import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";

export function getItems({ v, device }) {
  const dvv = (key) => defaultValueValue({ v, key, device });

  const coverImageSrc = dvv("coverImageSrc");
  const type = dvv("type");

  const disabledZoomPlaySize = coverImageSrc
    ? []
    : [
        {
          id: "coverZoom",
          type: "slider",
          disabled: true
        },
        {
          id: "iconSize",
          type: "slider",
          disabled: true
        }
      ];
  const disabledPlayIconColor = coverImageSrc
    ? {}
    : {
        id: "toolbarColor",
        type: "popover",
        config: {
          size: "medium",
          title: t("Colors"),
          icon: {}
        },
        devices: "desktop",
        roles: ["admin"],
        position: 90,
        options: [
          {
            id: "tabsColor",
            type: "tabs",
            tabs: [
              {
                id: "tabPlay",
                label: t("Play"),
                position: 20,
                options: [
                  {
                    id: "iconBgColor",
                    type: "colorPicker",
                    disabled: true
                  }
                ]
              },
              {
                id: "tabIcon",
                label: t("Icon"),
                position: 30,
                options: [
                  {
                    id: "iconColor",
                    type: "colorPicker",
                    disabled: true
                  }
                ]
              }
            ]
          }
        ]
      };

  return [
    {
      id: "toolbarCurrentElement",
      type: "popover",
      config: {
        icon: "nc-play",
        title: t("Video")
      },
      devices: "desktop",
      position: 80,
      options: [
        {
          id: "tabsCurrentElement",
          type: "tabs",
          tabs: [
            {
              id: "tabCurrentElement",
              label: t("Video"),
              options: [
                {
                  id: "type",
                  label: t("Type"),
                  type: "select",
                  choices: [
                    { value: "youtube", title: "YouTube" },
                    { value: "vimeo", title: "Vimeo" }
                  ]
                },
                {
                  id: "video",
                  label: t("Link"),
                  type: "inputText",
                  devices: "desktop",
                  config: {
                    size: "large"
                  },
                  placeholder:
                    type === "youtube"
                      ? t("YouTube")
                      : type === "vimeo"
                      ? t("Vimeo")
                      : ""
                }
              ]
            },
            {
              id: "tabCurrentElementAdvanced",
              label: t("Advanced"),
              options: [
                {
                  id: "controls",
                  label: t("Controls"),
                  type: "switch",
                  devices: "desktop",
                  disabled: type === "vimeo"
                },
                {
                  id: "branding",
                  label: t("Branding"),
                  type: "switch",
                  devices: "desktop",
                  disabled: dvv("controls") !== "on" || type !== "youtube"
                },
                {
                  id: "intro",
                  label: t("Intro"),
                  type: "switch",
                  devices: "desktop",
                  disabled: type !== "vimeo"
                },
                {
                  id: "loop",
                  label: t("Loop"),
                  type: "switch",
                  devices: "desktop"
                },
                {
                  id: "start",
                  type: "number-dev",
                  label: t("Start"),
                  devices: "desktop",
                  config: {
                    size: "short",
                    max: 99999,
                    spinner: false
                  },
                  helper: {
                    content: t("Specify a start time (in seconds)")
                  }
                },
                {
                  id: "end",
                  type: "number-dev",
                  label: t("End"),
                  devices: "desktop",
                  disabled: type === "vimeo",
                  config: {
                    size: "short",
                    max: 99999,
                    spinner: false
                  },
                  helper: {
                    content: t("Specify an end time (in seconds)")
                  }
                }
              ]
            },
            {
              id: "tabCurrentElementCover",
              label: t("Cover"),
              options: [
                {
                  label: t("Cover"),
                  id: "cover",
                  type: "imageUpload",
                  devices: "desktop"
                },
                ...disabledZoomPlaySize
              ]
            }
          ]
        }
      ]
    },
    disabledPlayIconColor,
    {
      id: "toolbarSettings",
      type: "popover",
      config: {
        title: t("Settings")
      },
      roles: ["admin"],
      position: 110,
      options: [
        {
          id: "styles",
          type: "sidebarTabsButton",
          config: {
            tabId: "styles",
            text: t("Styling"),
            icon: "nc-cog",
            align: "left"
          }
        }
      ]
    }
  ];
}
