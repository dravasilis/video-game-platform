import React, { useEffect, useState } from "react";
import "./custom-input.scss";
interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  triggerCheck?: boolean;
  value: string | null;
  emitValue: (value: string) => void;
}

const CustomInput = (props: Props) => {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div className="flex flex-col gap-2 px-5 py-2 input-wrapper">
      <span className="text-primary-350 text-sm input-label duration-200">
        {props.label}
      </span>
      <input
        type={props.type ?? "text"}
        value={value ?? ""}
        name={props.label}
        placeholder={props.placeholder ?? "type here..."}
        className={
          `bg-white px-4 py-2 text-sm rounded-lg ` +
          (props.isRequired && !value && props.triggerCheck
            ? "border border-[#ff3a44]"
            : "bg-white")
        }
        onChange={(e) => {
          props.emitValue(e.target.value);
        }}
      />
      {props.isRequired && !value && props.triggerCheck && (
        <span className="text-[#ff3a44] text-xs">
          {props.label.substring(0, props.label.length - 1)} cannot be empty.
        </span>
      )}
    </div>
  );
};

export default CustomInput;
