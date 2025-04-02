"use client";
import React from "react";
import styles from "../../../games/[id]/page.module.scss";

interface Props {
  appliedFilter: string;
  filterName: string;
  filterSlug: string;
  clearFilter: (filterName: string) => void;
}

const AppliedFilter = ({
  appliedFilter,
  filterName,
  filterSlug,
  clearFilter,
}: Props) => {
  return (
    <div className="flex items-center gap-1">
      <i className="text-primary-150">{filterName}:</i>
      <button
        onClick={() => clearFilter(filterSlug)}
        className={`${styles.pill} cursor-pointer`}
      >
        {appliedFilter}
        <span className="text-primary-150">🞬</span>
      </button>
    </div>
  );
};

export default AppliedFilter;
