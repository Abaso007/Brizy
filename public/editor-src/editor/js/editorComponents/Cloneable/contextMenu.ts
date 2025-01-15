import type { ElementModel } from "visual/component/Elements/Types";
import type { ContextMenuItem } from "visual/editorComponents/EditorComponent/types";
import {
  ElementTypes,
  readElementType
} from "visual/global/Config/types/configs/ElementTypes";
import { t } from "visual/utils/i18n";

export const getTranslationsMap = (): Partial<{
  [k in ElementTypes]: string;
}> => ({
  Button: t("Button"),
  Icon: t("Icon")
});

const suffix = "Container";

export default {
  getItems: (v: ElementModel): ContextMenuItem[] => {
    const type = readElementType(v.items?.[0]?.type);
    const translation = getTranslationsMap();
    const title = type ? (translation[type] ?? "") + ` ${suffix}` : suffix;

    return [
      {
        id: "main",
        type: "group",
        title,
        items: []
      }
    ];
  }
};
