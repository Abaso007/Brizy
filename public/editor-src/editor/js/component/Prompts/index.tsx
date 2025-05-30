import { isEqual } from "es-toolkit";
import { produce } from "immer";
import React, {
  Component,
  ComponentProps,
  ElementType,
  JSX,
  ReactElement
} from "react";
import { SignAuthorizationProps } from "visual/component/Prompts/PromptAuthorization/types";
import { PromptBlocksProps } from "visual/component/Prompts/PromptBlocks/types";
import { Props as PromptPageArticleProps } from "visual/component/Prompts/PromptPageArticle/types";
import { Props as PromptPageRulesProps } from "visual/component/Prompts/PromptPageRules/types";
import { Props as PromptPageTemplateProps } from "visual/component/Prompts/PromptPageTemplate/types";
import {
  PromptAppsProps,
  PromptConditionsProps,
  PromptFontsProps,
  PromptFormProps,
  PromptIconProps,
  PromptKeyHelperProps,
  PromptsOpenProps
} from "visual/component/Prompts/types";
import { ConfigCommon } from "visual/global/Config/types/configs/ConfigCommon";
import UIState from "visual/global/UIState";
import { useConfig } from "visual/providers/ConfigProvider";
import { EditorMode } from "visual/providers/EditorModeProvider";
import { BlockMetaType } from "visual/types/GlobalBlock";
import Apps from "./PromptApps";
import Authorization from "./PromptAuthorization";
import Blocks from "./PromptBlocks";
import Conditions from "./PromptConditions";
import Fonts from "./PromptFonts";
import Form from "./PromptForm";
import Icon from "./PromptIcon";
import KeyHelper from "./PromptKeyHelper";
import { PromptPageArticle } from "./PromptPageArticle";
import { PromptPageRules } from "./PromptPageRules";
import { PromptPageTemplate } from "./PromptPageTemplate";
import { Prompt } from "./api";

const PROMPTS = {
  icon: Icon,
  apps: Apps,
  blocks: Blocks,
  form: Form,
  keyHelper: KeyHelper,
  fonts: Fonts,
  conditions: Conditions,
  authorization: Authorization,
  pageRules: PromptPageRules,
  pageTemplate: PromptPageTemplate,
  pageArticle: PromptPageArticle
};

export type PromptTypes = typeof PROMPTS;
export type PromptKey = keyof PromptTypes;
export type PromptsMode = "single" | "stack";

export type PromptsProps<T extends BlockMetaType = "normal"> = {
  mode: PromptsMode;
  prompt: PromptKey;
  props:
    | PromptFormProps
    | SignAuthorizationProps
    | Omit<PromptBlocksProps<T>, "config">
    | PromptConditionsProps
    | PromptAppsProps
    | Omit<PromptIconProps, "config">
    | PromptFontsProps
    | PromptKeyHelperProps
    | PromptPageRulesProps
    | PromptPageTemplateProps
    | PromptPageArticleProps;
};

type PromptsState = {
  prompts: (PromptsProps & { opened: boolean })[];
};

interface PromptProps {
  editorMode: EditorMode;
  config: ConfigCommon;
}

class _Prompts extends Component<PromptProps, PromptsState> {
  globalConfig = this.props.config;

  state: PromptsState = {
    prompts: []
  };

  static open<K extends PromptKey>(data: {
    prompt: K;
    mode: PromptsMode;
    props?: PromptsOpenProps<ComponentProps<PromptTypes[K]>>;
  }): void {
    Prompt.open(data);
  }

  static close(promptName: PromptKey): void {
    Prompt.close(promptName);
  }

  componentDidMount(): void {
    UIState.addChangeListener("prompt", this.onUIStateChange);
    UIState.addChangeListener("closePrompt", this.onUIStateClosePrompt);
  }

  componentDidUpdate(prevProps: Readonly<PromptProps>) {
    const { config: prevConfig } = prevProps;
    const { config } = this.props;

    if (!isEqual(prevConfig, config)) {
      this.globalConfig = config;
    }
  }

  componentWillUnmount(): void {
    UIState.removeChangeListener("prompt", this.onUIStateChange);
    UIState.removeChangeListener("closePrompt", this.onUIStateClosePrompt);
  }

  onUIStateChange = (data: unknown): void => {
    this.open(data as PromptsProps);
  };

  onUIStateClosePrompt = (promptName: unknown) => {
    const position = this.state.prompts.findIndex(
      ({ prompt }) => prompt === promptName
    );

    if (position !== -1) {
      this.close(position);
    }
  };

  close(position: number): void {
    this.setState(
      produce((state) => {
        const prompt = state.prompts[position];

        if (prompt && prompt.opened) {
          prompt.opened = false;
        }
      }),
      () => {
        this.setState(
          produce((state) => {
            state.prompts.splice(position, 1);
          })
        );
      }
    );
  }

  open(data: PromptsProps): void {
    const { mode = "single" } = data;
    const { prompts } = this.state;
    const promptIndex = prompts.findIndex(
      ({ prompt }) => prompt == data.prompt
    );

    if (promptIndex === -1) {
      this.setState(
        produce((state) => {
          state.prompts.push(data);
        }),
        () => {
          this.setState(
            produce((state) => {
              const promptLength = state.prompts.length;
              state.prompts[promptLength - 1].opened = true;
            })
          );
        }
      );
    } else {
      if (mode === "stack") {
        this.setState(
          produce((state) => {
            state.prompts[promptIndex] = {
              ...data,
              opened: true
            };
          })
        );
      } else {
        this.setState(
          produce((state) => {
            state.prompts.forEach((_: PromptsProps, index: number) => {
              state.prompts[index].opened = false;
            });
            state.prompts[promptIndex] = {
              ...data,
              opened: true
            };
          })
        );
      }
    }
  }

  getComponent<K extends PromptKey>(
    type: K,
    props: ComponentProps<PromptTypes[K]>
  ): ReactElement<PromptTypes[K]> {
    const Component: ElementType = PROMPTS[type];

    return <Component {...props} editorMode={this.props.editorMode} />;
  }

  render(): ReactElement[] | null {
    const { prompts } = this.state;

    if (prompts.length) {
      return prompts.map(({ opened, prompt, props = {} }, index) => {
        return this.getComponent(prompt, {
          ...props,
          opened,
          config: this.globalConfig,
          key: index,
          onClose: (): void => {
            this.close(index);

            if (props.onClose) {
              props.onClose();
            }
          }
        });
      });
    }

    return null;
  }
}

const Prompts = (props: Omit<PromptProps, "config">): JSX.Element => {
  const config = useConfig();

  return <_Prompts {...props} config={config} />;
};

Prompts.open = _Prompts.open;
Prompts.close = _Prompts.close;

export default Prompts;
