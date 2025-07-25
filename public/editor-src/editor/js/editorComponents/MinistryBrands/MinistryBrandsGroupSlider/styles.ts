import { DynamicStylesProps } from "visual/types";
import { renderStyles } from "visual/utils/cssStyle";
import { OutputStyle, Styles } from "visual/utils/cssStyle/types";
import { Value } from "./types";

export function style(data: DynamicStylesProps<Value>): OutputStyle {
  const { v } = data;
  const { maskShape = "none" } = v;

  const styles: Styles = {
    ".brz && .brz-ministryBrands.brz-groupSlider": {
      standart: ["cssStylePaddingBG"]
    },
    ".brz && .brz-groupSlider-swiper-slide": {
      standart: [
        "cssStyleElementMinistryGroupSliderItemsBetween",
        "cssStyleElementMinistryGroupSliderSlidesToShow"
      ]
    },
    ".brz && .brz-ministryBrands__item--media": {
      standart: [
        "cssStyleElementOfMinistryBrandsImageWidth",
        "cssStyleElementOfMinistryBrandsImagePadding",
        "cssStyleMinistryElementMediaBorderRadius"
      ]
    },
    ".brz && .brz-ministryBrands__item--media:hover": {
      standart: [
        "cssStyleElementOfMinistryBrandsImgBorder",
        ...(maskShape === "none"
          ? ["cssStyleElementOfMinistryBrandsImgBoxShadow"]
          : ["cssStyleElementOfMinistryBrandsImgMaskShadow"])
      ]
    },
    ".brz && .brz-ministryBrands__item--media::after": {
      standart: [
        "cssStyleMaskShape",
        "cssStyleMaskCustomShape",
        "cssStyleMaskSize",
        "cssStyleMaskPosition",
        "cssStyleMaskRepeat"
      ]
    },
    ".brz && .brz-ministryBrands__item--media:hover::after": {
      standart: [
        "cssStyleElementOfMinistryBrandsImgBgColor",
        "cssStyleElementOfMinistryBrandsImgBgGradient"
      ]
    },
    ".brz && .brz-ministryBrands__item--media :is(img, video, iframe)": {
      standart: [
        "cssStyleMaskShape",
        "cssStyleMaskCustomShape",
        "cssStyleMaskSize",
        "cssStyleMaskPosition",
        "cssStyleMaskRepeat"
      ]
    },
    ".brz && .brz-ministryBrands__item--media:hover :is(img, video, iframe)": {
      standart: ["cssStyleElementOfMinistryBrandsImgFilters"]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info": {
      standart: [
        "cssStyleBorderRadius",
        "cssStyleElementMinistryGroupSliderItemsAlign",
        "cssStyleElementMinistryGroupSliderMetaSpacing"
      ]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info:hover": {
      standart: [
        "cssStylementOfMinistryBrandsParentBgColor",
        "cssStylementOfMinistryBrandsParentBgGradient",
        "cssStylementOfMinistryBrandsParentBorder",
        "cssStylementOfMinistryBrandsParentBoxShadow"
      ]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-ministryBrands__item--media":
      {
        standart: ["cssStyleElementMinistryGroupSliderItemsImageAlign"]
      },
    ".brz && .brz-slick-slider__dots li.slick-active": {
      standart: ["cssStyleElementMinistryGroupSliderDotsColorColorActive"]
    },
    ".brz && .brz-slick-slider__dots li:not(.slick-active):hover": {
      standart: ["cssStyleElementMinistryGroupSliderDotsColorColor"]
    },
    ".brz && .brz-ministryBrands__meta--icons": {
      standart: ["cssStyleElementOfMinistryBrandsMetaIconsSpacing"]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_heading":
      {
        standart: ["cssStyleElementOfMinistryBrandsTitleTypography"]
      },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_heading:hover":
      {
        standart: ["cssStyleElementOfMinistryBrandsTitleColor"]
      },
    ".brz && .brz-ministryBrands__item--meta-title": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemTitleMargin",
        "cssStyleElementMinistryBrandsMetaItemTitlePadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-day": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemDayMargin",
        "cssStyleElementMinistryBrandsMetaItemDayPadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-times": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemTimesMargin",
        "cssStyleElementMinistryBrandsMetaItemTimesPadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-category": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemCategoryMargin",
        "cssStyleElementMinistryBrandsMetaItemCategoryPadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-group": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemGroupMargin",
        "cssStyleElementMinistryBrandsMetaItemGroupPadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-status": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemStatusMargin",
        "cssStyleElementMinistryBrandsMetaItemStatusPadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-childcare": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemChildcareMargin",
        "cssStyleElementMinistryBrandsMetaItemChildcarePadding"
      ]
    },
    ".brz && .brz-ministryBrands__item--meta-resourceLink": {
      standart: [
        "cssStyleElementMinistryBrandsMetaItemResourceLinkMargin",
        "cssStyleElementMinistryBrandsMetaItemResourceLinkPadding"
      ]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_meta":
      {
        standart: ["cssStyleElementMinistryGroupSliderMetaTypography"]
      },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_meta:hover":
      {
        standart: ["cssStyleElementOfMinistryBrandsMetaColor"]
      },
    ".brz && .brz-groupSlider-info .brz-groupSlider_meta--link": {
      standart: ["cssStyleElementMinistryGroupSliderMetaTypography"]
    },
    ".brz && .brz-groupSlider-info .brz-groupSlider_meta--link > .brz-ministryBrands__meta--icons:hover":
      {
        standart: ["cssStyleElementOfMinistryBrandsMetaColor"]
      },
    ".brz && .brz-groupSlider-info .brz-groupSlider_meta--link a:hover": {
      standart: ["cssStyleElementOfMinistryBrandsMetaLinksColor"]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info p": {
      standart: ["cssStyleElementMinistryGroupSliderMetaTypography"]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info p:hover": {
      standart: ["cssStyleElementOfMinistryBrandsMetaColor"]
    },
    ".brz && .brz-swiper-arrow_prev": {
      standart: [
        "cssStyleElementMinistryGroupSliderArrowSize",
        "cssStyleElementMinistryGroupSliderArrowSpacingLeft"
      ]
    },
    ".brz && .brz-swiper-arrow_prev:hover": {
      standart: ["cssStyleElementMinistryGroupSliderArrowColor"]
    },
    ".brz && .brz-swiper-arrow_next": {
      standart: [
        "cssStyleElementMinistryGroupSliderArrowSize",
        "cssStyleElementMinistryGroupSliderArrowSpacingRight"
      ]
    },
    ".brz && .brz-swiper-arrow_next:hover": {
      standart: ["cssStyleElementMinistryGroupSliderArrowColor"]
    },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_detail_button .brz-button":
      {
        standart: [
          "cssStyleElementMinistryGroupSliderButtonSize",
          "cssStyleElementMinistryGroupSliderButtonWidth",
          "cssStyleElementMinistryGroupSliderButtonTypography",
          "cssStyleElementMinistryBrandsButtonsBorderRadius"
        ]
      },
    ".brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_detail_button .brz-button:hover":
      {
        standart: [
          "cssStyleElementMinistryGroupSliderButtonColor",
          "cssStyleElementMinistryGroupSliderButtonBgColor",
          "cssStyleElementMinistryGroupSliderButtonBgGradient",
          "cssStyleElementMinistryGroupSliderButtonBorder",
          "cssStyleElementMinistryGroupSliderButtonBoxShadow"
        ],
        interval: ["cssStyleMinistryBrandsButtonsHoverTransition"]
      },
    ".brz && .brz-ministryBrands__item--media, .brz && .brz-ministryBrands__item--media::after, .brz && .brz-ministryBrands__item--media :is(img, video, iframe), .brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info, .brz && .brz-slick-slider__dots li:not(.slick-active), .brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_heading, .brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info .brz-groupSlider_meta, .brz && .brz-groupSlider-info .brz-groupSlider_meta--link > .brz-ministryBrands__meta--icons, .brz && .brz-groupSlider-info .brz-groupSlider_meta--link a, .brz && .brz-groupSlider-swiper-slide .brz-groupSlider-info p, .brz && .brz-swiper-arrow_prev, .brz && .brz-swiper-arrow_next":
      {
        standart: [
          "cssStyleHoverTransition",
          "cssStylePropertyHoverTransitionColor"
        ]
      }
  };

  return renderStyles({ ...data, styles });
}
