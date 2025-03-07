import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorIcon from "visual/component/EditorIcon";
import { isStory, useEditorMode } from "visual/providers/EditorModeProvider";
import { updateUI } from "visual/redux/actions2";
import { showHiddenElementsSelector } from "visual/redux/selectors";
import { t } from "visual/utils/i18n";
import { BottomPanelItem } from "./Item";

function HiddenElementsToggle(): JSX.Element {
  const dispatch = useDispatch();
  const showHiddenElements = useSelector(showHiddenElementsSelector);
  const { mode } = useEditorMode();

  // ! write less hacky later
  if (isStory(mode)) {
    return <></>;
  }

  const icon = showHiddenElements ? "nc-eye-17" : "nc-eye-ban-18";
  const title = showHiddenElements
    ? t("Hide Hidden Elements")
    : t("Show Hidden Elements");

  return (
    <BottomPanelItem
      paddingSize="medium"
      active={true}
      pointer={true}
      title={title}
      onClick={(): void => {
        dispatch(updateUI("showHiddenElements", !showHiddenElements));
      }}
    >
      <EditorIcon icon={icon} />
    </BottomPanelItem>
  );
}

export default HiddenElementsToggle;
