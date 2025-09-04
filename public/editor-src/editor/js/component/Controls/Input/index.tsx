import classNames from "classnames";
import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedEffect } from "visual/component/hooks";

export interface Props {
  className?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const Input = ({
  className = "",
  value,
  onChange,
  onBlur,
  placeholder = ""
}: Props): JSX.Element => {
  const baseClass = "brz-ed-control__input2";
  const _className = classNames(baseClass, className);

  return (
    <div className={_className}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={({ target: { value } }): void => onChange(value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export const InputWithDebounce = ({
  className = "",
  value,
  onChange,
  placeholder = ""
}: Omit<Props, "onBlur">): JSX.Element => {
  const [_value, setValue] = useState(value);

  const lastUpdate = useRef(_value);

  useEffect(() => {
    if (lastUpdate.current !== value) {
      lastUpdate.current = value;
      setValue(value);
    }
  }, [value]);

  useDebouncedEffect(
    () => {
      if (lastUpdate.current !== _value) {
        lastUpdate.current = _value;
        onChange(_value);
      }
    },
    1000,
    [onChange, _value]
  );

  const handleBlur = useCallback(() => {
    if (lastUpdate.current !== _value) {
      lastUpdate.current = _value;

      onChange(_value);
    }
  }, [onChange, _value]);

  return (
    <Input
      className={className}
      onChange={setValue}
      onBlur={handleBlur}
      value={_value}
      placeholder={placeholder}
    />
  );
};
