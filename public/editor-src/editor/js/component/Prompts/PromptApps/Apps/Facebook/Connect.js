import React, { Component } from "react";
import { addAccount, deleteAccount, pendingRequest } from "visual/utils/api";
import { t } from "visual/utils/i18n";
import { Context } from "../../../common/GlobalApps/Context";
import { Connect } from "../../../common/GlobalApps/StepsView";
import validation from "./validation";

const apiKeys = [{ name: "appid", title: "App ID" }];

class FacebookConnect extends Component {
  static contextType = Context;

  constructor(props, context) {
    super(props);
    const {
      app: { data }
    } = context;

    this.state = {
      apiKeyValue: data ? data : this.getDefaultValue(),
      nextLoading: false,
      prevLoading: false,
      error: null
    };
  }

  static async onBeforeLoad(context, props) {
    if (context.app.data) {
      props.onChangeNext("disconnect");
    }
  }

  getDefaultValue() {
    return apiKeys.reduce((acc, { name }) => ({ ...acc, [`${name}`]: "" }), {});
  }

  handleChange = (value, type) => {
    this.setState(({ apiKeyValue }) => ({
      apiKeyValue: {
        ...apiKeyValue,
        [`${type}`]: value.trim()
      }
    }));
  };

  handleConnect = async () => {
    const { app, onChangeNext } = this.context;
    const { apiKeyValue } = this.state;
    const keysValue = Object.values(apiKeyValue);

    this.setState({
      nextLoading: true,
      error: null
    });

    if (keysValue.some((key) => !key)) {
      // Emitted fake request
      await pendingRequest();

      this.setState({
        error: t("Fields are empty"),
        nextLoading: false
      });
    } else {
      const { data, group, id: service } = app;
      const [appId] = keysValue;
      const { config } = this.props;

      const isValidate = await validation(appId);

      if (!isValidate) {
        this.setState({
          isValidate: false,
          error: t("Your AppId is no valid, re check and try again"),
          nextLoading: false
        });

        return;
      }

      if (data && data.id) {
        const { success } = await deleteAccount(data.id, config);

        if (!success) {
          this.setState({
            nextLoading: false,
            error: t("Something went wrong")
          });
        }
      }

      const { success } = await addAccount(
        {
          service,
          group,
          ...apiKeyValue
        },
        config
      );

      if (!success) {
        this.setState({
          nextLoading: false,
          error: t("Something went wrong")
        });
      } else {
        onChangeNext();
      }
    }
  };

  handlePrev = async () => {
    this.setState({
      prevLoading: true
    });

    await pendingRequest();
    this.context.onChangePrev();
  };

  render() {
    const { app } = this.context;
    const { apiKeyValue, nextLoading, prevLoading, error } = this.state;
    const data = apiKeys.map(({ title, name }) => ({
      title,
      name,
      value: apiKeyValue[name]
    }));

    return (
      <Connect
        {...app}
        data={data}
        nextLoading={nextLoading}
        prevLoading={prevLoading}
        error={error}
        onChange={this.handleChange}
        onNext={this.handleConnect}
        onPrev={this.handlePrev}
      />
    );
  }
}

export default FacebookConnect;
