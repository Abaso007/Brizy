import { Action, createStore } from "redux";
import { ConfigCommon } from "visual/global/Config/types/configs/ConfigCommon";

const __MOCKED_VISUAL_CONFIG__ = {
  urls: {
    editorIcons: "/",
    mode: "page"
  }
} as unknown as ConfigCommon;

const jestGetConfig = () => __MOCKED_VISUAL_CONFIG__;

export const mockDataForReduxStore = {
  project: {
    data: {
      selectedStyle: "bahcadtpvdhdphmhymrsgrwobyzhxcdzytyx",
      styles: [
        {
          id: "bahcadtpvdhdphmhymrsgrwobyzhxcdzytyx",
          title: "Overpass",
          colorPalette: [
            {
              id: "color1",
              hex: "#A170D9"
            },
            {
              id: "color2",
              hex: "#1C1C1C"
            },
            {
              id: "color3",
              hex: "#05CAB6"
            },
            {
              id: "color4",
              hex: "#B8E6E1"
            },
            {
              id: "color5",
              hex: "#F5D4D1"
            },
            {
              id: "color6",
              hex: "#EBEBEB"
            },
            {
              id: "color7",
              hex: "#666666"
            },
            {
              id: "color8",
              hex: "#FFFFFF"
            }
          ],
          fontStyles: [
            {
              deletable: "off",
              id: "paragraph",
              title: "Paragraph",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 16,
              fontSizeSuffix: "px",
              fontWeight: 400,
              lineHeight: 1.9,
              letterSpacing: 0,
              tabletFontSize: 15,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 400,
              tabletLineHeight: 1.6,
              tabletLetterSpacing: 0,
              mobileFontSize: 15,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 400,
              mobileLineHeight: 1.6,
              mobileLetterSpacing: 0
            },
            {
              deletable: "off",
              id: "subtitle",
              title: "Subtitle",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 17,
              fontSizeSuffix: "px",
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: 0,
              tabletFontSize: 17,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 400,
              tabletLineHeight: 1.5,
              tabletLetterSpacing: 0,
              mobileFontSize: 16,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 400,
              mobileLineHeight: 1.5,
              mobileLetterSpacing: 0
            },
            {
              deletable: "off",
              id: "abovetitle",
              title: "Above Title",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 13,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: 1.1,
              tabletFontSize: 13,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.5,
              tabletLetterSpacing: 1,
              mobileFontSize: 13,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.5,
              mobileLetterSpacing: 1
            },
            {
              deletable: "off",
              id: "heading1",
              title: "Heading 1",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 46,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: -1.5,
              tabletFontSize: 38,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.2,
              tabletLetterSpacing: -1,
              mobileFontSize: 36,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.3,
              mobileLetterSpacing: -1
            },
            {
              deletable: "off",
              id: "heading2",
              title: "Heading 2",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 36,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: -1.5,
              tabletFontSize: 30,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.2,
              tabletLetterSpacing: -1,
              mobileFontSize: 28,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.3,
              mobileLetterSpacing: -1
            },
            {
              deletable: "off",
              id: "heading3",
              title: "Heading 3",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 28,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.4,
              letterSpacing: -1.5,
              tabletFontSize: 27,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.3,
              tabletLetterSpacing: -1,
              mobileFontSize: 22,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.3,
              mobileLetterSpacing: -0.5
            },
            {
              deletable: "off",
              id: "heading4",
              title: "Heading 4",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 22,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: -0.5,
              tabletFontSize: 22,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.4,
              tabletLetterSpacing: -0.5,
              mobileFontSize: 20,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.4,
              mobileLetterSpacing: 0
            },
            {
              deletable: "off",
              id: "heading5",
              title: "Heading 5",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 20,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.6,
              letterSpacing: 0,
              tabletFontSize: 17,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.7,
              tabletLetterSpacing: 0,
              mobileFontSize: 17,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.8,
              mobileLetterSpacing: 0
            },
            {
              deletable: "off",
              id: "heading6",
              title: "Heading 6",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 16,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: 0,
              tabletFontSize: 16,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.5,
              tabletLetterSpacing: 0,
              mobileFontSize: 16,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.5,
              mobileLetterSpacing: 0
            },
            {
              deletable: "off",
              id: "button",
              title: "Button",
              fontFamily: "overpass",
              fontFamilyType: "google",
              fontSize: 15,
              fontSizeSuffix: "px",
              fontWeight: 700,
              lineHeight: 1.6,
              letterSpacing: 0,
              tabletFontSize: 17,
              tabletFontSizeSuffix: "px",
              tabletFontWeight: 700,
              tabletLineHeight: 1.6,
              tabletLetterSpacing: 0,
              mobileFontSize: 15,
              mobileFontSizeSuffix: "px",
              mobileFontWeight: 700,
              mobileLineHeight: 1.6,
              mobileLetterSpacing: 0
            }
          ]
        }
      ],
      extraFontStyles: []
    }
  },
  projectStatus: {
    locked: false,
    lockedBy: false
  },
  page: {
    data: {
      items: []
    }
  },
  globalBlocks: {},
  authorized: "connected",
  syncAllowed: false,
  fonts: {
    config: {
      data: [
        {
          kind: "webfonts#webfont",
          family: "Lato",
          category: "sans-serif",
          variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "700",
            "700italic",
            "900",
            "900italic"
          ],
          subsets: ["latin-ext", "latin"],
          version: "v15",
          lastModified: "2019-03-26",
          files: {
            "100":
              "http://fonts.gstatic.com/s/lato/v15/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
            "300":
              "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
            "700":
              "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
            "900":
              "http://fonts.gstatic.com/s/lato/v15/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
            "100italic":
              "http://fonts.gstatic.com/s/lato/v15/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
            "300italic":
              "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
            regular:
              "http://fonts.gstatic.com/s/lato/v15/S6uyw4BMUTPHvxk6XweuBCY.ttf",
            italic:
              "http://fonts.gstatic.com/s/lato/v15/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
            "700italic":
              "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
            "900italic":
              "http://fonts.gstatic.com/s/lato/v15/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf"
          },
          brizyId: "uzrpsocdxtgrkbxjjxkchqcybpvpzsuvdlji"
        }
      ]
    }
  },
  config: __MOCKED_VISUAL_CONFIG__,
  editorMode: "page"
};

const initialState = {};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

// TODO: in future meybe we need to use store instance with structure like our real production store
const store = createStore(reducer);

export { store, __MOCKED_VISUAL_CONFIG__ as config, jestGetConfig };
