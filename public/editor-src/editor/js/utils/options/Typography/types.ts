import { OptionValue } from "visual/component/Options/types";
import { Weight } from "visual/utils/fonts/Weight";
import { Positive } from "visual/utils/math/Positive";

export type TypographyValues = Omit<
  OptionValue<"typography">,
  | "letterSpacing"
  | "variableFontWeight"
  | "fontWidth"
  | "fontSoftness"
  | "bold"
  | "strike"
  | "italic"
  | "underline"
  | "uppercase"
  | "lowercase"
  | "fontWeight"
  | "script"
  | "fontSize"
  | "lineHeight"
> & {
  letterSpacing: string;
  fontWeight: Weight | string;
  variableFontWeight: string;
  textDecoration: string;
  textTransform: string;
  fontSize: Positive | string;
  lineHeight: Positive | string;
  bold: boolean | string;
  italic: boolean | string;
};

export interface TextTransformValues {
  textDecoration: string;
  textTransform: string;
}

export type TypographyCssValue = OptionValue<"typography"> &
  Partial<TextTransformValues>;
