import { DynamicStylesProps } from "visual/types";
import { renderStyles } from "visual/utils/cssStyle";
import type { OutputStyle } from "visual/utils/cssStyle/types";
import type { Styles } from "visual/utils/cssStyle/types";
import type { Value } from "./types";

export function style(data: DynamicStylesProps<Value>): OutputStyle {
  const styles: Styles = {
    ".brz &&": {
      standart: ["cssStyleSizeWidth"]
    },
    ".brz &&:hover": {
      standart: ["cssStyleBoxShadow"]
    },
    ".brz && .brz-toc-header": {
      standart: ["cssStyleElementTOCHeaderPadding"]
    },
    ".brz && .brz-toc-header:hover": {
      standart: [
        "cssStyleElementTOCHeaderBgColor",
        "cssStyleElementTOCHeaderBorder"
      ]
    },
    ".brz && .brz-toc-header .brz-toc-title": {
      standart: [
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing",
        "cssStyleTypography2FontVariation",
        "cssStyleTextTransforms"
      ]
    },
    ".brz && .brz-toc-header:hover .brz-toc-title": {
      standart: ["cssStyleElementTOCTitleColor"]
    },
    ".brz && .brz-toc-body__list": {
      standart: [
        "cssStyleElementTOCBodyFontFamily",
        "cssStyleElementTOCBodyFontSize",
        "cssStyleElementTOCBodyLineHeight",
        "cssStyleElementTOCBodyFontWeight",
        "cssStyleElementTOCBodyLetterSpacing",
        "cssStyleElementTOCBodyFontVariation",
        "cssStyleElementTOCBodyTextTransform",
        "cssStyleElementTOCWordWrap"
      ]
    },
    ".brz && .brz-toc-body__list:hover": {
      standart: ["cssStyleElementTOCBodyBgColor"]
    },
    ".brz && .brz-toc-body__list .brz-li:hover": {
      standart: ["cssStyleElementTOCBodyColor"]
    },
    ".brz &&.brz-toc--opened .brz-toc-body:hover": {
      standart: ["cssStyleElementTOCBodyBorder"]
    },
    ".brz && .brz-toc-body__list, .brz && .brz-toc-message": {
      standart: ["cssStyleElementTOCBodyPadding"]
    },
    ".brz && .brz-toc-body li .brz-toc-body__list-marker": {
      standart: ["cssStyleElementTOCBodyMarkerSize"]
    },
    ".brz && .brz-toc-body li:hover .brz-toc-body__list-marker": {
      standart: ["cssStyleElementTOCBodyMarkerColor"]
    },
    ".brz && .brz-toc-body li::marker": {
      standart: ["cssStyleElementTOCBodyMarkerSize"]
    },
    ".brz && .brz-toc-body li:hover::marker": {
      standart: ["cssStyleElementTOCBodyMarkerColor"]
    },
    ".brz && .brz-toc-header:hover .brz-toc-icon-wrapper": {
      standart: ["cssStyleElementTOCTitleColor"]
    },
    ".brz && .brz-toc-header .brz-toc-icon-wrapper, .brz && .brz-toc-body li::marker, .brz && .brz-toc-body li .brz-toc-body__list-marker, .brz &&, .brz && .brz-toc-header, .brz && .brz-toc-header .brz-toc-title, .brz && .brz-toc-body__list, .brz && .brz-toc-body__list .brz-li, .brz &&.brz-toc--opened .brz-toc-body":
      {
        standart: [
          "cssStyleHoverTransition",
          "cssStyleElementTOCPropertyHoverTransition"
        ]
      }
  };

  return renderStyles({ ...data, styles });
}
