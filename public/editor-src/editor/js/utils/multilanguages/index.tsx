import { match } from "fp-utilities";
import { Config } from "visual/global/Config/types";
import {
  CMS,
  isCMS,
  isCloud,
  isShopify
} from "visual/global/Config/types/configs/Cloud";
import { ConfigCommon } from "visual/global/Config/types/configs/ConfigCommon";
import { isWp } from "visual/global/Config/types/configs/WP";

export type M = "on" | "off";

export type Language = {
  name: string;
  code: string;
};

export const hasMultiLanguage = (m: M, mLanguages: string): boolean => {
  try {
    return !!JSON.parse(mLanguages).length && m === "on";
  } catch (e) {
    return false;
  }
};

export const getTranslationsLanguages = (config: ConfigCommon): Language[] => {
  const availableRoles = match(
    [
      isWp,
      (): Language[] => {
        return [];
      }
    ],
    [
      isCloud,
      match(
        [isCMS, (c: CMS): Language[] => c.availableTranslations],
        [isShopify, () => []]
      )
    ]
  );

  return availableRoles(config as Config) || [];
};

export const getLanguagesChoices = (
  config: Config
): {
  title: string;
  value: string;
}[] => {
  const membershipRoles = getTranslationsLanguages(config);

  return membershipRoles.map(({ code, name }) => ({
    title: name,
    value: code
  }));
};
