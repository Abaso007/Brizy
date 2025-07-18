import React, { Component } from "react";
import { replaceAt } from "timm";
import { pendingRequest, updateIntegration } from "visual/utils/api";
import { t } from "visual/utils/i18n";
import { Context } from "../../common/GlobalApps/Context";
import { SelectFields } from "../../common/GlobalApps/StepsView";
import { checkRequiredFields, getFields } from "../../common/utils";

class Fields extends Component {
  static contextType = Context;

  constructor(props, context) {
    super(props);
    const {
      app: {
        data: { fieldsMap, fields },
        restrictions
      },
      formFields
    } = context;

    this.state = {
      formFields: getFields(fieldsMap, fields, formFields, restrictions),
      prevLoading: false,
      nextLoading: false,
      error: null
    };
  }

  handleActive = (id, target) => {
    const { formFields } = this.state;
    const index = formFields.findIndex(({ sourceId }) => sourceId === id);

    this.setState({
      formFields: replaceAt(formFields, index, { ...formFields[index], target })
    });
  };

  handlePrev = async () => {
    this.setState({
      prevLoading: true,
      error: null
    });

    // Emitted fake request
    await pendingRequest();

    this.context.onChangePrev();
  };

  handleNext = async () => {
    const { config } = this.props;

    const {
      app: { id, data: appData },
      formId,
      onChange,
      onChangeNext
    } = this.context;
    const { formFields } = this.state;

    this.setState({
      nextLoading: true,
      error: null
    });

    if (!checkRequiredFields(appData.fields, formFields, "select")) {
      // Emitted fake request
      await pendingRequest();

      this.setState({
        error: t("All fields marked with an asterisk ( * ) must be mapped."),
        nextLoading: false
      });
    } else {
      const data = await updateIntegration(
        {
          ...appData,
          formId,
          fieldsMap: JSON.stringify(formFields),
          completed: true
        },
        config
      );

      if (!data) {
        this.setState({
          nextLoading: false,
          error: t("Something went wrong")
        });
      } else {
        onChange(id, { ...appData, ...data }, onChangeNext);
      }
    }
  };

  render() {
    const { app } = this.context;
    const { formFields, error, nextLoading, prevLoading } = this.state;

    return (
      <SelectFields
        {...app}
        {...app.data}
        formFields={formFields}
        error={error}
        nextLoading={nextLoading}
        prevLoading={prevLoading}
        onActive={this.handleActive}
        onPrev={this.handlePrev}
        onNext={this.handleNext}
      />
    );
  }
}

export default Fields;
