import { Str } from "@brizy/readers";
import type { EcwidStoreId } from "visual/global/Ecwid/types";
import { EcwidService } from "visual/libs/Ecwid";
import type { EcwidConfig } from "visual/libs/Ecwid/types/EcwidConfig";
import type { ExportFunction } from "visual/types";
import { parseFromString } from "visual/utils/string";
import { blockClicksBySelectors } from "./utils";

export const fn: ExportFunction = ($node) => {
  const root = $node.get(0);

  if (!root) {
    return;
  }

  root
    .querySelectorAll<HTMLDivElement>(".brz-ecwid-favorites")
    .forEach((node) => {
      const storeId = node.getAttribute("data-store-id") as EcwidStoreId | null;
      const config = Str.read(node.getAttribute("data-storefront"));
      const cfg = config ? parseFromString<EcwidConfig>(config) : {};

      const onPageLoaded = () => {
        const items = node.querySelectorAll<HTMLElement>(".grid-product");
        items.forEach(blockClicksBySelectors);
      };

      if (storeId) {
        EcwidService.init(storeId, {
          ...cfg,
          onPageLoaded
        }).favorites(node);
      }
    });
};
