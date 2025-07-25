import classnames from "classnames";
import React, { ReactNode } from "react";
import { ToastNotification } from "visual/component/Notifications";
import Toolbar from "visual/component/Toolbar";
import EditorComponent from "visual/editorComponents/EditorComponent";
import { DynamicContentHelper } from "visual/editorComponents/WordPress/common/DynamicContentHelper";
import { Wrapper } from "visual/editorComponents/tools/Wrapper";
import { updateEkklesiaFields } from "visual/utils/api";
import { attachRefs } from "visual/utils/react";
import * as sidebarConfig from "../sidebar";
import * as sidebarExtendButtons from "../sidebarExtendButtons";
import {
  sidebarMinistryBrandsMetaCategory,
  sidebarMinistryBrandsMetaChildcare,
  sidebarMinistryBrandsMetaDay,
  sidebarMinistryBrandsMetaGroup,
  sidebarMinistryBrandsMetaResourceLink,
  sidebarMinistryBrandsMetaStatus,
  sidebarMinistryBrandsMetaTimes,
  sidebarMinistryBrandsMetaTitle
} from "../sidebars/sidebars";
import * as toolbarDate from "../toolbarDate";
import * as toolbarExtendButtons from "../toolbarExtendButtons";
import * as toolbarImage from "../toolbarImage";
import * as toolbarMetaIcons from "../toolbarMetaIcons";
import * as toolbarMetaTypography from "../toolbarMetaTypography";
import * as toolbarPagination from "../toolbarPagination";
import * as toolbarPreview from "../toolbarPreview";
import * as toolbarTitle from "../toolbarTitle";
import * as toolbarMetaItemLinkColor from "../toolbars/toolbarMetaItemLinkColor";
import { getEkklesiaMessages } from "../utils/helpers";
import defaultValue from "./defaultValue.json";
import { style } from "./styles";
import * as toolbarExtendParent from "./toolbarExtendParent";
import { Props, Value } from "./types";
import { getPlaceholder } from "./utils/dynamicContent";

export class MinistryBrandsGroupFeatured extends EditorComponent<Value, Props> {
  static defaultValue = defaultValue;
  static experimentalDynamicContent = true;

  static get componentId(): "MinistryBrandsGroupFeatured" {
    return "MinistryBrandsGroupFeatured";
  }

  async componentDidMount(): Promise<void> {
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
    const { category, group, groupRecentList } = this.getValue();
    const config = this.getGlobalConfig();

    const changedKeys = await updateEkklesiaFields(config, {
      fields: [
        { value: { category, groupRecentList }, module: { key: "smallgroup" } },
        { value: { group }, module: { key: "groups" } }
      ]
    });

    if (changedKeys) {
      const messages = getEkklesiaMessages();
      ToastNotification.warn(messages["group_featured"]);
      this.patchValue(changedKeys);
    }
  }

  renderForEdit(v: Value, vs: Value, vd: Value): ReactNode {
    const className = classnames(
      "brz-groupFeatured__wrapper",
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
        {...this.makeToolbarPropsFromConfig2(
          toolbarTitle,
          sidebarMinistryBrandsMetaTitle,
          {
            allowExtend: false
          }
        )}
        selector=".brz-ministryBrands__item--meta-title"
      >
        {({ ref: titleRef }) => (
          <Toolbar
            {...this.makeToolbarPropsFromConfig2(
              toolbarDate,
              sidebarMinistryBrandsMetaDay,
              {
                allowExtend: false
              }
            )}
            selector=".brz-ministryBrands__item--meta-day"
          >
            {({ ref: dayRef }) => (
              <Toolbar
                {...this.makeToolbarPropsFromConfig2(
                  toolbarDate,
                  sidebarMinistryBrandsMetaTimes,
                  {
                    allowExtend: false
                  }
                )}
                selector=".brz-ministryBrands__item--meta-times"
              >
                {({ ref: timesRef }) => (
                  <Toolbar
                    {...this.makeToolbarPropsFromConfig2(
                      toolbarMetaTypography,
                      sidebarMinistryBrandsMetaCategory,
                      {
                        allowExtend: false
                      }
                    )}
                    selector=".brz-ministryBrands__item--meta-category"
                  >
                    {({ ref: categoryRef }) => (
                      <Toolbar
                        {...this.makeToolbarPropsFromConfig2(
                          toolbarMetaTypography,
                          sidebarMinistryBrandsMetaGroup,
                          {
                            allowExtend: false
                          }
                        )}
                        selector=".brz-ministryBrands__item--meta-group"
                      >
                        {({ ref: groupRef }) => (
                          <Toolbar
                            {...this.makeToolbarPropsFromConfig2(
                              toolbarMetaTypography,
                              sidebarMinistryBrandsMetaStatus,
                              {
                                allowExtend: false
                              }
                            )}
                            selector=".brz-ministryBrands__item--meta-status"
                          >
                            {({ ref: statusRef }) => (
                              <Toolbar
                                {...this.makeToolbarPropsFromConfig2(
                                  toolbarMetaTypography,
                                  sidebarMinistryBrandsMetaChildcare,
                                  {
                                    allowExtend: false
                                  }
                                )}
                                selector=".brz-ministryBrands__item--meta-childcare"
                              >
                                {({ ref: childcareRef }) => (
                                  <Toolbar
                                    {...this.makeToolbarPropsFromConfig2(
                                      toolbarMetaTypography,
                                      sidebarMinistryBrandsMetaResourceLink,
                                      {
                                        allowExtend: false
                                      }
                                    )}
                                    selector=".brz-ministryBrands__item--meta-resourceLink > span"
                                  >
                                    {({ ref: resourceLinkRef }) => (
                                      <Toolbar
                                        {...this.makeToolbarPropsFromConfig2(
                                          toolbarMetaItemLinkColor,
                                          sidebarMinistryBrandsMetaResourceLink,
                                          {
                                            allowExtend: false
                                          }
                                        )}
                                        selector=".brz-ministryBrands__item--meta--links"
                                      >
                                        {({ ref: linksRef }) => (
                                          <Toolbar
                                            {...this.makeToolbarPropsFromConfig2(
                                              toolbarExtendButtons,
                                              sidebarExtendButtons,
                                              {
                                                allowExtend: false
                                              }
                                            )}
                                            selector=".brz-ministryBrands__item--meta--button"
                                          >
                                            {({ ref: buttonRef }) => (
                                              <Toolbar
                                                {...this.makeToolbarPropsFromConfig2(
                                                  toolbarPreview,
                                                  undefined,
                                                  {
                                                    allowExtend: false
                                                  }
                                                )}
                                                selector=".brz-groupFeatured__item--meta--preview *"
                                              >
                                                {({ ref: previewRef }) => (
                                                  <Toolbar
                                                    {...this.makeToolbarPropsFromConfig2(
                                                      toolbarPagination,
                                                      undefined,
                                                      {
                                                        allowExtend: false
                                                      }
                                                    )}
                                                    selector=".brz-ministryBrands__pagination"
                                                  >
                                                    {({
                                                      ref: paginationRef
                                                    }) => (
                                                      <Toolbar
                                                        {...this.makeToolbarPropsFromConfig2(
                                                          toolbarImage,
                                                          undefined,
                                                          {
                                                            allowExtend: false
                                                          }
                                                        )}
                                                        selector=".brz-ministryBrands__item--media"
                                                      >
                                                        {({
                                                          ref: mediaRef
                                                        }) => (
                                                          <Toolbar
                                                            {...this.makeToolbarPropsFromConfig2(
                                                              toolbarMetaIcons,
                                                              undefined,
                                                              {
                                                                allowExtend:
                                                                  false
                                                              }
                                                            )}
                                                            selector=".brz-ministryBrands__meta--icons"
                                                          >
                                                            {({
                                                              ref: iconsRef
                                                            }) => (
                                                              <Wrapper
                                                                {...this.makeWrapperProps(
                                                                  {
                                                                    className,
                                                                    ref: (
                                                                      el
                                                                    ) => {
                                                                      attachRefs(
                                                                        el,
                                                                        [
                                                                          titleRef,
                                                                          dayRef,
                                                                          timesRef,
                                                                          categoryRef,
                                                                          groupRef,
                                                                          statusRef,
                                                                          childcareRef,
                                                                          resourceLinkRef,
                                                                          linksRef,
                                                                          buttonRef,
                                                                          previewRef,
                                                                          paginationRef,
                                                                          mediaRef,
                                                                          iconsRef
                                                                        ]
                                                                      );
                                                                    }
                                                                  }
                                                                )}
                                                              >
                                                                <DynamicContentHelper
                                                                  placeholder={getPlaceholder(
                                                                    v
                                                                  )}
                                                                  props={{
                                                                    className:
                                                                      "brz-groupFeatured"
                                                                  }}
                                                                  blocked={
                                                                    false
                                                                  }
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
