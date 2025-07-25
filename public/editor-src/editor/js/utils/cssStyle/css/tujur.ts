import { Sheet } from "visual/providers/StyleProvider/Sheet";
import { murmurhash2 } from "visual/utils/crypto";
import { makeAttr } from "visual/utils/i18n/attribute";
import { uuid } from "visual/utils/uuid";
import { addUuid, getNodeWithNewReference } from "./utils";

// ====== tujur ======
export function css(
  defaultID: string,
  elementID: string,
  [defaultStyle, rulesStyle, elementStyle]: [string, string, string],
  sheet: Readonly<Sheet>
) {
  let defaultData;
  const isBrowser = typeof window !== "undefined";
  const cssOrdered = sheet.getCSSOrdered();

  if (defaultStyle) {
    defaultData = sheet.get(defaultID);
    // we don't treat the else clause because we assume that
    // default styles will be the same for a given id no matter
    // how many times this function will be called
    if (!defaultData) {
      const className = `brz-css-${murmurhash2(defaultStyle + elementID)}`;
      const cssText = replacePlaceholders(defaultStyle, className);
      let node;

      if (isBrowser) {
        const doc = sheet.getDoc() ?? document;
        node = doc.createElement("style");

        addUuid(node);

        if (process.env.NODE_ENV === "development") {
          node.setAttribute(makeAttr("css"), `default-${defaultID}`);
        }
        node.appendChild(doc.createTextNode(""));
        node.childNodes[0].nodeValue = cssText;

        insertStyleNodeIntoDOM("default", { node, doc, sheet });
      }

      defaultData = {
        node,
        className,
        cssText
      };

      cssOrdered.default.push(defaultData);
      sheet.set(defaultID, defaultData);
    } else {
      const { node, className, cssText } = defaultData;
      const cssTextNext = replacePlaceholders(defaultStyle, className);

      if (cssTextNext !== cssText) {
        if (node) {
          node.childNodes[0].nodeValue = cssTextNext;
        }

        defaultData.cssText = cssTextNext;
      }
    }
  }

  let rulesData;
  if (rulesStyle) {
    const rulesStyleHash = murmurhash2(rulesStyle);

    rulesData = sheet.get(rulesStyleHash);
    if (!rulesData) {
      const className = `brz-css-${murmurhash2(rulesStyle + elementID)}`;
      const cssText = replacePlaceholders(rulesStyle, className);
      let node;

      if (isBrowser) {
        const doc = sheet.getDoc() ?? document;
        node = doc.createElement("style");

        addUuid(node);

        if (process.env.NODE_ENV === "development") {
          node.setAttribute(makeAttr("css"), `rules-${defaultID}`);
        }
        node.appendChild(doc.createTextNode(""));
        node.childNodes[0].nodeValue = cssText;

        insertStyleNodeIntoDOM("rules", { node, doc, sheet });
      }

      rulesData = {
        node,
        className,
        cssText
      };

      cssOrdered.rules.push(rulesData);
      sheet.set(rulesStyleHash, rulesData);
    }
  }

  let elementData;
  if (elementStyle) {
    elementData = sheet.get(elementID);
    if (!elementData) {
      const className = `brz-css-${murmurhash2(elementStyle + elementID)}`;
      const cssText = replacePlaceholders(elementStyle, className);
      let node;

      if (isBrowser) {
        const doc = sheet.getDoc() ?? document;
        node = doc.createElement("style");

        addUuid(node);

        if (process.env.NODE_ENV === "development") {
          node.setAttribute(makeAttr("css"), `custom-${defaultID}`);
        }
        node.appendChild(doc.createTextNode(""));
        node.childNodes[0].nodeValue = cssText;

        insertStyleNodeIntoDOM("custom", { node, doc, sheet });
      }

      elementData = {
        node,
        className,
        cssText
      };

      cssOrdered.custom.push(elementData);
      sheet.set(elementID, elementData);
    } else {
      const { className, cssText } = elementData;
      let { node } = elementData;
      const cssTextNext = replacePlaceholders(elementStyle, className);

      if (cssTextNext !== cssText) {
        if (node && !document.head.contains(node)) {
          const doc = sheet.getDoc() ?? document;

          const newRef = getNodeWithNewReference(node, doc);

          if (newRef) {
            node = newRef;
            elementData.node = newRef;
          }
        }

        if (node) {
          node.childNodes[0].nodeValue = cssTextNext;
        }

        elementData.cssText = cssTextNext;
      }
    }
  }

  return [
    ...(defaultData ? [defaultData.className] : []),
    ...(rulesData ? [rulesData.className] : []),
    ...(elementData ? [elementData.className] : [])
  ].join(" ");
}

// Used only for RichText(Quill)
export function css1(
  elementID: string,
  elementStyle: string,
  sheet: Readonly<Sheet>,
  replacePlaceholdersCb = replacePlaceholders
) {
  let elementData = sheet.get(elementID);
  const cssOrdered = sheet.getCSSOrdered();
  const isBrowser = typeof window !== "undefined";

  if (!elementData) {
    const className = `brz-css-${uuid(5)}`;
    const cssText = replacePlaceholdersCb(elementStyle, className);
    let node;

    if (isBrowser) {
      const doc = sheet.getDoc() ?? document;

      node = doc.createElement("style");
      if (process.env.NODE_ENV === "development") {
        node.setAttribute(makeAttr("css"), "");
      }
      node.appendChild(doc.createTextNode(""));
      node.childNodes[0].nodeValue = cssText;

      insertStyleNodeIntoDOM("custom", { node, doc, sheet });
    }

    elementData = {
      node,
      className,
      cssText
    };
    cssOrdered.custom.push(elementData);
    sheet.set(elementID, elementData);
  } else {
    const { node, className, cssText } = elementData;
    const cssTextNext = replacePlaceholdersCb(elementStyle, className);

    if (cssTextNext !== cssText) {
      if (node) {
        node.childNodes[0].nodeValue = cssTextNext;
      }

      elementData = {
        node,
        className,
        cssText: cssTextNext
      };
      sheet.set(elementID, elementData);
    }
  }

  return {
    className: elementData.className,
    cssText: elementData.cssText,
    clean() {
      const elementData = sheet.get(elementID);
      const doc = sheet.getDoc() ?? document;

      if (elementData?.node) {
        doc.head.removeChild(elementData.node);
      }
      sheet.delete(elementID);
    }
  };
}

export function replacePlaceholders(styles: string, className: string) {
  const s = styles.replace(/{{WRAPPER}}/gm, `.${className}`);
  return s.replace(/&&/gm, `.${className}`);
}

function insertStyleNodeIntoDOM(
  styleType: "default" | "rules" | "custom",
  data: {
    node: HTMLElement;
    doc: Document;
    sheet: Readonly<Sheet>;
  }
) {
  const { node: styleNode, doc, sheet } = data;
  const cssOrdered = sheet.getCSSOrdered();
  const default_ = cssOrdered.default; // can't use default as a identifier
  const rules = cssOrdered.rules;
  const custom = cssOrdered.custom;
  let refNode;

  switch (styleType) {
    case "default":
      refNode = default_.length > 0 ? default_[default_.length - 1].node : null;
      break;
    case "rules":
      refNode =
        rules.length > 0
          ? rules[rules.length - 1].node
          : default_.length > 0
            ? default_[default_.length - 1].node
            : null;
      break;
    case "custom":
      refNode =
        custom.length > 0
          ? custom[custom.length - 1].node
          : rules.length > 0
            ? rules[rules.length - 1].node
            : default_.length > 0
              ? default_[default_.length - 1].node
              : null;
      break;
    default:
      throw new Error("invalid tujur css node type: " + styleType);
  }

  if (refNode) {
    if (!doc.head.contains(refNode)) {
      const newRef = getNodeWithNewReference(refNode, doc);

      if (newRef) {
        refNode = newRef;
      }
    }

    refNode.insertAdjacentElement("afterend", styleNode);
  } else {
    doc.head.appendChild(styleNode);
  }
}
