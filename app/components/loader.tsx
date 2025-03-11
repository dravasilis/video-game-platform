"use client";
import React, { useEffect, useState } from "react";

interface LoaderProps {
  data: { name: string }[];
  onLoaderChange: (state: boolean) => void;
}

const loader = ({ data, onLoaderChange }: LoaderProps) => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    onLoaderChange(true);
    console.log(data);
    if (data) {
      setLoader(false);
      onLoaderChange(false);
    }
  }, [data]);

  return <div>{loader ? "Loading..." : "Loaded"}</div>;
};

export default loader;
