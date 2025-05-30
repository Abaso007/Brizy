import React, { ForwardedRef, forwardRef } from "react";
import EditorIcon from "visual/component/EditorIcon";
import { SelectItemProps } from "./type";

function Item(props: SelectItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    value,
    handleSelectInputChange,
    onRemove,
    isEditor,
    renderIconTrash
  } = props;

  return isEditor ? (
    <div className="brz-forms2__select-item" ref={ref}>
      <>
        <div className="brz-forms2__select-item__input">
          <input
            className="brz-input"
            value={value}
            onChange={handleSelectInputChange}
          />
        </div>
        {renderIconTrash && (
          <div className="brz-forms2__select-item__icon" onClick={onRemove}>
            <EditorIcon icon="nc-trash" />
          </div>
        )}
      </>
    </div>
  ) : (
    <option value={value}>{value}</option>
  );
}

// @ts-expect-error: Type Omit<SelectItemProps, "ref"> is missing the following properties from type CheckboxItemProps:
const SelectItem = forwardRef(Item);

export default SelectItem;
