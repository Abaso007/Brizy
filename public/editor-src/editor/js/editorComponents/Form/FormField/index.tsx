import classnames from "classnames";
import React, { ReactNode } from "react";
import { ElementModel } from "visual/component/Elements/Types";
import Toolbar from "visual/component/Toolbar";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { Model } from "visual/editorComponents/EditorComponent/types";
import { ElementTypes } from "visual/global/Config/types/configs/ElementTypes";
import defaultValue from "./defaultValue.json";
import * as sidebar from "./sidebar";
import { style } from "./styles";
import * as toolbar from "./toolbar";
import { Value } from "./type";
import * as types from "./types/index";

export default class Input extends EditorComponent<Value> {
  static defaultValue = defaultValue;

  static get componentId(): ElementTypes.FormField {
    return ElementTypes.FormField;
  }

  renderForEdit(v: Value, vs: Value, vd: Value): ReactNode {
    const { className } = this.props;
    const { type } = v;
    const Component = types[type as keyof typeof types];

    const _className = classnames(
      "brz-forms__item",
      className,
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

    return (
      <Toolbar {...this.makeToolbarPropsFromConfig2(toolbar, sidebar)}>
        {({ ref }) => (
          <div className={_className} ref={ref}>
            <Component
              renderContext={this.props.renderContext}
              {...v}
              onChange={(value: Partial<Model<ElementModel>>) =>
                this.patchValue(value)
              }
            />
          </div>
        )}
      </Toolbar>
    );
  }
}
