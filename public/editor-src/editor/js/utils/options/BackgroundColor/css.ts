import { getColor } from "visual/utils/color";
import { CSSStyleFn } from "visual/utils/cssStyle/types";

export const css: CSSStyleFn<"backgroundColor"> = ({ meta, value }): string => {
  const { isDisabled } = meta ?? {};

  if (isDisabled) {
    return "background-color: transparent;";
  }

  const { isSolid, isGradient, isLinearGradient, isRadialGradient } =
    meta ?? {};

  const {
    hex,
    opacity,
    palette,
    gradientHex,
    gradientOpacity,
    gradientPalette,
    start,
    end,
    linearDegree,
    radialDegree
  } = value;

  const backgroundColor = getColor(palette, hex, opacity);

  if (isSolid) {
    return `background-color:${backgroundColor}; background-image:none;`;
  }

  if (isGradient) {
    const gradientColor = getColor(
      gradientPalette,
      gradientHex,
      gradientOpacity
    );

    if (isLinearGradient) {
      return `background-image: linear-gradient(${linearDegree}deg, ${backgroundColor} ${start}%, ${gradientColor} ${end}%);`;
    }

    if (isRadialGradient) {
      return `background-image: radial-gradient(circle ${radialDegree}px, ${backgroundColor} ${start}%, ${gradientColor} ${end}%);`;
    }
  }

  return "";
};
