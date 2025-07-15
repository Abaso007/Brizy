import classnames from "classnames";
import React, { ReactNode } from "react";
import { ToastNotification } from "visual/component/Notifications";
import Toolbar from "visual/component/Toolbar";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { DynamicContentHelper } from "visual/editorComponents/WordPress/common/DynamicContentHelper";
import { Wrapper } from "visual/editorComponents/tools/Wrapper";
import { ElementTypes } from "visual/global/Config/types/configs/ElementTypes";
import { updateEkklesiaFields } from "visual/utils/api";
import { attachRefs } from "visual/utils/react";
import * as sidebarConfig from "../sidebar";
import * as toolbarExtendButtons from "../toolbarExtendButtons";
import * as toolbarImage from "../toolbarImage";
import * as toolbarMedia from "../toolbarMedia";
import * as toolbarMetaIcons from "../toolbarMetaIcons";
import * as toolbarMetaTypography from "../toolbarMetaTypography";
import * as toolbarPagination from "../toolbarPagination";
import * as toolbarPreview from "../toolbarPreview";
import * as toolbarTitle from "../toolbarTitle";
import { getEkklesiaMessages } from "../utils/helpers";
import defaultValue from "./defaultValue.json";
import { style } from "./styles";
import * as toolbarExtendParent from "./toolbarExtendParent";
import { Props, Value } from "./types";
import { getPlaceholder } from "./utils/dynamicContent";

export class MinistryBrandsArticleList extends EditorComponent<Value, Props> {
  static defaultValue = defaultValue;
  static experimentalDynamicContent = true;

  static get componentId(): ElementTypes.MinistryBrandsArticleList {
    return ElementTypes.MinistryBrandsArticleList;
  }

  async componentDidMount() {
    const toolbarExtend = this.makeToolbarPropsFromConfig2(
      toolbarExtendParent,
      sidebarConfig,
      {
        allowExtend: false,
        allowExtendFromThirdParty: true,
        thirdPartyExtendId: `${this.getComponentId()}Parent`
      }
    );

    this.props.extendParentToolbar(toolbarExtend);
    const { category, group, series } = this.getValue();
    const config = this.getGlobalConfig();

    const changedKeys = await updateEkklesiaFields(config, {
      fields: [
        { value: { category }, module: { key: "articleCategories" } },
        { value: { group }, module: { key: "groups" } },
        { value: { series }, module: { key: "articleSeries" } }
      ]
    });

    if (changedKeys) {
      const messages = getEkklesiaMessages();
      ToastNotification.warn(messages["article_list"]);
      this.patchValue(changedKeys);
    }
  }

  renderForEdit(v: Value, vs: Value, vd: Value): ReactNode {
    const className = classnames(
      "brz-articleList__wrapper",
      "brz-ministryBrands",
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
      <Toolbar
        {...this.makeToolbarPropsFromConfig2(toolbarImage, undefined, {
          allowExtend: false
        })}
        selector=".brz-ministryBrands__item--media"
      >
        {({ ref: mediaRef }) => (
          <Toolbar
            {...this.makeToolbarPropsFromConfig2(toolbarTitle, undefined, {
              allowExtend: false
            })}
            selector=".brz-articleList__item--meta--title"
          >
            {({ ref: titleRef }) => (
              <Toolbar
                {...this.makeToolbarPropsFromConfig2(
                  toolbarMetaTypography,
                  undefined,
                  {
                    allowExtend: false
                  }
                )}
                selector=".brz-articleList__item--meta"
              >
                {({ ref: itemMetaRef }) => (
                  <Toolbar
                    {...this.makeToolbarPropsFromConfig2(
                      toolbarMetaIcons,
                      undefined,
                      {
                        allowExtend: false
                      }
                    )}
                    selector=".brz-ministryBrands__meta--icons"
                  >
                    {({ ref: iconsMetaRef }) => (
                      <Toolbar
                        {...this.makeToolbarPropsFromConfig2(
                          toolbarMedia,
                          undefined,
                          {
                            allowExtend: false
                          }
                        )}
                        selector=".brz-articleList__item--media a"
                      >
                        {({ ref: itemMediaRef }) => (
                          <Toolbar
                            {...this.makeToolbarPropsFromConfig2(
                              toolbarPreview,
                              undefined,
                              {
                                allowExtend: false
                              }
                            )}
                            selector=".brz-articleList__item--meta--preview"
                          >
                            {({ ref: itemPreviewRef }) => (
                              <Toolbar
                                {...this.makeToolbarPropsFromConfig2(
                                  toolbarExtendButtons,
                                  undefined,
                                  {
                                    allowExtend: false
                                  }
                                )}
                                selector=".brz-ministryBrands__item--meta--button"
                              >
                                {({ ref: buttonsRef }) => (
                                  <Toolbar
                                    {...this.makeToolbarPropsFromConfig2(
                                      toolbarPagination,
                                      undefined,
                                      {
                                        allowExtend: false
                                      }
                                    )}
                                    selector=".brz-ministryBrands__pagination a"
                                  >
                                    {({ ref: paginationRef }) => (
                                      <Wrapper
                                        {...this.makeWrapperProps({
                                          className,
                                          ref: (el) => {
                                            attachRefs(el, [
                                              mediaRef,
                                              titleRef,
                                              itemMetaRef,
                                              iconsMetaRef,
                                              itemMediaRef,
                                              itemPreviewRef,
                                              buttonsRef,
                                              paginationRef
                                            ]);
                                          }
                                        })}
                                      >
                                        <DynamicContentHelper
                                          placeholder={getPlaceholder(v)}
                                          props={{
                                            className: "brz-articleList"
                                          }}
                                          blocked={false}
                                          tagName="div"
                                        />
                                      </Wrapper>
                                    )}
                                  </Toolbar>
                                )}
                              </Toolbar>
                            )}
                          </Toolbar>
                        )}
                      </Toolbar>
                    )}
                  </Toolbar>
                )}
              </Toolbar>
            )}
          </Toolbar>
        )}
      </Toolbar>
    );
  }
}
