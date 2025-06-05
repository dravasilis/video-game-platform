import React, { useEffect } from "react";
interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  emitValue: (value: string) => void;
}

const CustomInput = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 px-5 py-2">
      <span className="text-primary-350 text-sm">{props.label}</span>
      <input
        type={props.type ?? "text"}
        className="bg-white px-4 py-2 text-sm rounded-lg"
      />
    </div>
  );
};

export default CustomInput;
