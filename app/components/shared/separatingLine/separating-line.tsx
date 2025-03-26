import React from "react";

const SeparatingLine = () => {
  return (
    <div>
      <div className="flex items-center w-full col-span-2">
        <span
          id="left-line"
          style={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(90deg, #1f2025 7.08%, #474747 100%)",
          }}
        ></span>
        <span
          id="right-line"
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, #474747 7.08%, rgba(31, 32, 37, 0) 100%)",
          }}
        ></span>
      </div>
    </div>
  );
};

export default SeparatingLine;
