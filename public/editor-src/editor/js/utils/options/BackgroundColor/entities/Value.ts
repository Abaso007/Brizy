import { Hex } from "visual/utils/color/Hex";
import { Opacity } from "visual/utils/cssProps/opacity";
import { Palette } from "visual/utils/options/ColorPicker/entities/palette";
import { GradientActivePointer } from "./GradientActivePointer";
import { GradientType } from "./GradientType";
import { Type } from "./Type";

export type Value = {
  hex: Hex;
  opacity: Opacity;
  tempOpacity: Opacity;
  palette: Palette;
  tempPalette: Palette;
  gradientHex: Hex;
  gradientOpacity: Opacity;
  tempGradientOpacity: Opacity;
  gradientPalette: Palette;
  tempGradientPalette: Palette;
  type: Type;
  tempType: Type;
  gradientType: GradientType;
  start: number;
  end: number;
  active: GradientActivePointer;
  linearDegree: number;
  radialDegree: number;
};
