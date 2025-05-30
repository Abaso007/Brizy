import classnames from "classnames";
import React from "react";
import BoxResizer from "visual/component/BoxResizer";
import CustomCSS from "visual/component/CustomCSS";
import Toolbar from "visual/component/Toolbar";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { DynamicContentHelper } from "visual/editorComponents/WordPress/common/DynamicContentHelper";
import { makePlaceholder } from "visual/utils/dynamicContent";
import { attachRefs } from "visual/utils/react";
import { Wrapper } from "../../tools/Wrapper";
import defaultValue from "./defaultValue.json";
import * as sidebarConfig from "./sidebar";
import { style } from "./styles";
import * as toolbarConfig from "./toolbar";

const resizerPoints = ["centerLeft", "centerRight"];

export default class WOOAttributes extends EditorComponent {
  static defaultValue = defaultValue;

  static get componentId() {
    return "WOOAttributes";
  }

  handleResizerChange = (patch) => this.patchValue(patch);
  handleTextChange = (patch) => this.patchValue(patch);

  renderForEdit(v, vs, vd) {
    const { className: className_ } = v;

    const className = classnames(
      "brz-woo-attributes",
      className_,
      this.css(
        this.getComponentId(),
        this.getId(),
        style({
          v,
          vs,
          vd,
          store: this.getReduxStore(),
          contexts: this.getContexts()
        })
      )
    );

    const restrictions = {
      width: {
        px: { min: 5, max: 1000 },
        "%": { min: 5, max: 100 }
      },
      tabletWidth: {
        px: { min: 5, max: 1000 },
        "%": { min: 5, max: 100 }
      },
      mobileWidth: {
        px: { min: 5, max: 1000 },
        "%": { min: 5, max: 100 }
      }
    };
    const placeholder = makePlaceholder({
      content: "{{editor_product_additional_info}}"
    });

    return (
      <Toolbar
        {...this.makeToolbarPropsFromConfig2(toolbarConfig, sidebarConfig)}
      >
        {({ ref: toolbarRef }) => (
          <CustomCSS selectorName={this.getId()} css={v.customCSS}>
            {({ ref: cssRef }) => (
              <Wrapper
                {...this.makeWrapperProps({
                  className,
                  ref: (el) => attachRefs(el, [toolbarRef, cssRef])
                })}
              >
                <BoxResizer
                  points={resizerPoints}
                  meta={this.props.meta}
                  value={v}
                  onChange={this.handleResizerChange}
                  restrictions={restrictions}
                >
                  <DynamicContentHelper
                    placeholder={placeholder}
                    placeholderIcon="woo-attributes"
                    tagName="div"
                  />
                </BoxResizer>
              </Wrapper>
            )}
          </CustomCSS>
        )}
      </Toolbar>
    );
  }
}
