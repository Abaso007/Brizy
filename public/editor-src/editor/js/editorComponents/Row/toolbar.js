import { DCTypes } from "visual/global/Config/types/DynamicContent";
import {
  getEnabledLinkOptions,
  isBackgroundPointerEnabled
} from "visual/global/Config/types/configs/featuresValue";
import { isPopup } from "visual/providers/EditorModeProvider";
import { getColorToolbar } from "visual/utils/color";
import { BgRepeat, BgSize } from "visual/utils/containers/types";
import { isPro } from "visual/utils/env";
import { t } from "visual/utils/i18n";
import { ImageType } from "visual/utils/image/types";
import {
  getMaskPositions,
  getMaskRepeat,
  getMaskShapes,
  getMaskSizes
} from "visual/utils/mask/Mask";
import { defaultValueValue } from "visual/utils/onChange";
import { getDynamicContentOption } from "visual/utils/options";
import { popupToOldModel } from "visual/utils/options/PromptAddPopup/utils";
import { Toggle } from "visual/utils/options/utils/Type";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import { capitalize } from "visual/utils/string";
import { read as readString } from "visual/utils/string/specs";
import { toolbarLinkAnchor } from "visual/utils/toolbar";
import { getMaxRowWidth, getMinRowWidth } from "./utils";

export const getItems = ({ v, device, component, context, editorMode }) => {
  const dvv = (key) => defaultValueValue({ v, key, device, state: "normal" });
  const config = component.getGlobalConfig();

  const linkDC = getDynamicContentOption({
    option: context.dynamicContent.config,
    type: DCTypes.link
  });

  const bgColor = getColorToolbar(
    dvv("bgColorPalette"),
    dvv("bgColorHex"),
    dvv("bgColorOpacity")
  );

  const inPopup = Boolean(component.props.meta.sectionPopup);
  const inPopup2 = Boolean(component.props.meta.sectionPopup2);

  const imageDynamicContentChoices = getDynamicContentOption({
    options: context.dynamicContent.config,
    type: DCTypes.image
  });

  const _isPopup = isPopup(editorMode);

  const customVideo = isPro(config)
    ? [
        {
          title: t("Custom Video"),
          value: "bgVideoCustom"
        }
      ]
    : [];

  const media = dvv("media");
  const videoType = dvv("bgVideoType");
  const coverBg = dvv("bgSize") === BgSize.Cover;

  const imageMedia = media === "image";
  const youtubeType = videoType === "youtube";
  const vimeoType = videoType === "vimeo";
  const customType = videoType === "bgVideoCustom";
  const urlType = videoType === "url";

  const maskShape = readString(dvv("maskShape")) ?? "none";
  const maskPosition = readString(dvv("maskPosition")) ?? "center center";
  const maskSize = readString(dvv("maskSize")) ?? "cover";
  const maskScaleSuffix = readString(dvv("maskScaleSuffix")) ?? "%";
  const maskCustomUploadImageSrc = readString(dvv("maskCustomUploadImageSrc"));
  const disableMaskTab = dvv("media") !== "image";
  const maskShapeIsDisabled =
    maskShape === "none" ||
    (maskShape === "custom" && !maskCustomUploadImageSrc) ||
    disableMaskTab;

  const image = media !== "image";
  const video = media !== "video";
  const map = media !== "map";

  const linkPopup = dvv("linkPopup");

  const deviceCapitalize = capitalize(device);
  const isExternalImage = dvv("bgImageType") !== ImageType.Internal;

  const isPointerEnabled = isBackgroundPointerEnabled(config, "row");

  const {
    internalLink,
    linkPopup: linkPopupEnabled,
    linkAnchor,
    linkExternal
  } = getEnabledLinkOptions(config);

  return [
    {
      id: `showOn${deviceCapitalize}`,
      type: "showOnDevice",
      devices: "responsive",
      position: 10,
      preserveId: true,
      choices: [
        {
          icon: "nc-eye-17",
          title: `${t("Disable on")} ${deviceCapitalize}`,
          value: Toggle.ON
        },
        {
          icon: "nc-eye-ban-18",
          title: `${t("Enable on")} ${deviceCapitalize}`,
          value: Toggle.OFF
        }
      ]
    },
    {
      id: "toolbarMedia",
      type: "popover",
      config: {
        icon: "nc-background",
        title: t("Background")
      },
      position: 80,
      options: [
        {
          id: "tabsMedia",
          type: "tabs",
          tabs: [
            {
              id: "tabMedia",
              label: t("Background"),
              options: [
                {
                  id: "media",
                  label: t("Type"),
                  type: "radioGroup",
                  choices: [
                    { value: "image", icon: "nc-media-image" },
                    { value: "video", icon: "nc-media-video" },
                    { value: "map", icon: "nc-media-map" }
                  ]
                },
                {
                  label: t("Image"),
                  id: "bg",
                  type: "imageUpload",
                  states: [NORMAL, HOVER],
                  devices: "desktop",
                  disabled: image,
                  population: imageDynamicContentChoices,
                  config: {
                    disableSizes: isExternalImage,
                    pointer: !isExternalImage && isPointerEnabled
                  }
                },
                {
                  label: t("Image"),
                  id: "bg",
                  type: "imageUpload",
                  states: [NORMAL, HOVER],
                  devices: "responsive",
                  disabled: image,
                  population: imageDynamicContentChoices,
                  config: {
                    disableSizes: isExternalImage,
                    pointer: !isExternalImage && isPointerEnabled
                  }
                },
                {
                  id: "bgSize",
                  label: t("Size"),
                  type: "select",
                  disabled: !imageMedia,
                  choices: [
                    { title: t("Cover"), value: BgSize.Cover },
                    { title: t("Contain"), value: BgSize.Contain },
                    { title: t("Auto"), value: BgSize.Auto }
                  ]
                },
                {
                  id: "bgRepeat",
                  label: t("Repeat"),
                  type: "select",
                  disabled: !imageMedia || coverBg,
                  choices: [
                    { title: t("No repeat"), value: BgRepeat.Off },
                    { title: t("Repeat"), value: BgRepeat.On },
                    { title: t("Repeat-X"), value: BgRepeat.RepeatX },
                    { title: t("Repeat-Y"), value: BgRepeat.RepeatY }
                  ]
                },
                {
                  id: "bgVideoType",
                  label: t("Video type"),
                  type: "select",
                  devices: "desktop",
                  disabled: video,
                  choices: [
                    { title: t("Youtube"), value: "youtube" },
                    { title: t("Vimeo"), value: "vimeo" },
                    ...customVideo,
                    { title: t("URL"), value: "url" }
                  ]
                },
                {
                  id: "bgVideo",
                  label: t("Link"),
                  type: "inputText",
                  devices: "desktop",
                  disabled: video || customType,
                  placeholder: youtubeType
                    ? t("YouTube")
                    : vimeoType
                      ? t("Vimeo")
                      : t("https://"),
                  helper: {
                    content: urlType
                      ? t("This is .mp4 URL.")
                      : youtubeType
                        ? t(
                            "Use the regular video links generated by YouTube. The 'feature=share' parameter is not a valid or recognized parameter by the YouTube platform."
                          )
                        : ""
                  }
                },
                {
                  id: "bgVideoCustom",
                  label: t("File"),
                  type: "fileUpload",
                  config: {
                    allowedExtensions: ["video/*"]
                  },
                  devices: "desktop",
                  disabled: video || !customType
                },
                {
                  id: "bgVideoLoop",
                  label: t("Loop"),
                  type: "switch",
                  devices: "desktop",
                  disabled: video
                },
                {
                  id: "bgMapAddress",
                  label: t("Address"),
                  type: "inputText",
                  devices: "desktop",
                  disabled: map,
                  placeholder: t("Enter address")
                },
                {
                  id: "bgMapZoom",
                  label: t("Zoom"),
                  type: "slider",
                  devices: "desktop",
                  disabled: map,
                  config: {
                    min: 1,
                    max: 21
                  }
                }
              ]
            },
            {
              id: "tabMask",
              label: t("Mask"),
              position: 110,
              options: [
                {
                  id: "maskShape",
                  label: t("Shape"),
                  devices: "desktop",
                  type: "select",
                  choices: getMaskShapes(),
                  disabled: disableMaskTab
                },
                {
                  id: "maskCustomUpload",
                  type: "imageUpload",
                  devices: "desktop",
                  label: t("Image"),
                  config: {
                    pointer: false,
                    disableSizes: true,
                    acceptedExtensions: ["png", "svg"]
                  },
                  helper: {
                    content: t("Upload only [ .png or .svg ]")
                  },
                  disabled: maskShape !== "custom" || disableMaskTab
                },
                {
                  id: "groupSize",
                  type: "group",
                  disabled: maskShapeIsDisabled,
                  options: [
                    {
                      id: "maskSize",
                      label: t("Size"),
                      type: "select",
                      choices: getMaskSizes()
                    },
                    {
                      id: "maskScale",
                      type: "slider",
                      disabled: maskSize !== "custom",
                      config: {
                        min: 1,
                        max: maskScaleSuffix === "px" ? 500 : 100,
                        units: [
                          { value: "%", title: "%" },
                          { value: "px", title: "px" }
                        ]
                      }
                    }
                  ]
                },
                {
                  id: "groupPosition",
                  type: "group",
                  disabled: maskShapeIsDisabled,
                  options: [
                    {
                      id: "maskPosition",
                      type: "select",
                      label: t("Position"),
                      choices: getMaskPositions()
                    },
                    {
                      id: "maskPositionx",
                      label: t("X"),
                      type: "slider",
                      disabled: maskPosition !== "custom",
                      config: {
                        min: 1,
                        max: 100,
                        units: [{ value: "%", title: "%" }]
                      }
                    },
                    {
                      id: "maskPositiony",
                      label: t("Y"),
                      type: "slider",
                      disabled: maskPosition !== "custom",
                      config: {
                        min: 1,
                        max: 100,
                        units: [{ value: "%", title: "%" }]
                      }
                    }
                  ]
                },
                {
                  id: "maskRepeat",
                  label: t("Repeat"),
                  type: "select",
                  disabled: maskShapeIsDisabled || maskSize === "cover",
                  choices: getMaskRepeat()
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarColor",
      type: "popover",
      config: {
        size: "medium",
        title: t("Colors"),
        icon: {
          style: {
            backgroundColor: bgColor
          }
        }
      },
      position: 90,
      options: [
        {
          id: "tabsColor",
          type: "tabs",
          tabs: [
            {
              id: "tabOverlay",
              label: t("Overlay"),
              options: [
                {
                  id: "",
                  type: "backgroundColor",
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
                  states: [NORMAL, HOVER],
                  disabled: !maskShapeIsDisabled
                }
              ]
            },
            {
              id: "tabDropShadow",
              label: t("Shadow"),
              options: [
                {
                  id: "maskShadow",
                  type: "textShadow",
                  states: [NORMAL, HOVER],
                  disabled: maskShapeIsDisabled
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarLink",
      type: "popover",
      config: {
        icon: "nc-link",
        title: t("Link"),
        size: "medium"
      },
      devices: "desktop",
      position: 100,
      disabled:
        inPopup || inPopup2 || _isPopup
          ? true
          : device === "desktop"
            ? dvv("linkLightBox") === "on"
            : dvv("linkType") !== "popup" || dvv("linkPopup") === "",
      options: [
        {
          id: "linkType",
          type: "tabs",
          config: {
            saveTab: true
          },
          tabs: [
            {
              id: "page",
              label: t("Page"),
              disabled: !internalLink,
              options: [
                {
                  id: "linkPage",
                  type: "internalLink",
                  label: t("Find Page")
                },
                {
                  id: "linkInternalBlank",
                  label: t("Open In New Tab"),
                  type: "switch"
                }
              ]
            },
            {
              id: "external",
              label: t("URL"),
              disabled: !linkExternal,
              options: [
                {
                  id: "link",
                  type: "population",
                  label: t("Link to"),
                  config: linkDC,
                  option: {
                    id: "linkExternal",
                    type: "inputText",
                    placeholder: "http://"
                  }
                },
                {
                  id: "linkExternalBlank",
                  type: "switch",
                  label: t("Open In New Tab")
                },
                {
                  id: "linkExternalRel",
                  type: "switch",
                  label: t("Make it Nofollow")
                }
              ]
            },
            {
              id: "anchor",
              label: t("Block"),
              disabled: !linkAnchor,
              options: [
                toolbarLinkAnchor({
                  v,
                  device,
                  state: "normal"
                })
              ]
            },
            {
              id: "popup",
              label: t("Popup"),
              disabled: !linkPopupEnabled,
              options: [
                {
                  id: "linkPopup",
                  type: "promptAddPopup",
                  label: t("Popup"),
                  config: {
                    popupKey: `${component.getId()}_${linkPopup}`
                  },
                  disabled: inPopup || inPopup2 || _isPopup,
                  dependencies: popupToOldModel
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarLinkResponsive",
      type: "popover",
      config: {
        icon: "nc-link",
        title: t("Link"),
        size: "medium"
      },
      position: 100,
      devices: "responsive",
      disabled: dvv("linkType") !== "popup" || linkPopup === "",
      options: [
        {
          id: "linkType",
          type: "tabs",
          config: {
            saveTab: true
          },
          tabs: [
            {
              id: "popup",
              label: t("Popup"),
              options: [
                {
                  id: "linkPopup",
                  type: "promptAddPopup",
                  label: t("Popup"),
                  config: {
                    popupKey: `${component.getId()}_${linkPopup}`,
                    canDelete: false
                  },
                  devices: "responsive",
                  disabled: dvv("linkType") !== "popup" || linkPopup === "",
                  dependencies: ({ linkPopup, linkPopupPopups }) => ({
                    linkPopup,
                    popups: linkPopupPopups
                  })
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
      position: 100,
      options: [
        {
          id: "size",
          label: t("Width"),
          type: "slider",
          position: 80,
          disabled: inPopup || inPopup2 || _isPopup,
          config: {
            min: getMinRowWidth({ v, device }),
            max: getMaxRowWidth({ v, device }),
            units: [
              { value: "%", title: "%" },
              { value: "px", title: "px" }
            ]
          }
        },
        {
          id: "multiPicker",
          type: "group",
          position: 90,
          disabled: inPopup2 || _isPopup,
          options: [
            {
              id: "columnsHeightStyle",
              label: t("Height"),
              type: "select",
              position: 90,
              choices: [
                { title: t("Auto"), value: "auto" },
                { title: t("Custom"), value: "custom" }
              ]
            },
            {
              id: "columnsHeight",
              type: "slider",
              disabled: dvv("columnsHeightStyle") !== "custom",
              position: 1100,
              config: {
                min: 20,
                max: 500,
                units: [{ value: "px", title: "px" }]
              }
            },
            {
              id: "verticalAlign",
              label: t("Content"),
              type: "radioGroup",
              disabled: dvv("columnsHeightStyle") !== "custom",
              position: 1100,
              choices: [
                { value: "top", icon: "nc-align-top" },
                { value: "center", icon: "nc-align-middle" },
                { value: "bottom", icon: "nc-align-bottom" }
              ]
            }
          ]
        },
        {
          id: "grid",
          type: "grid",
          config: {
            separator: true
          },
          columns: [
            {
              id: "grid-settings",
              size: 1,
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
              id: "grid-effects",
              size: 1,
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
    }
  ];
};
