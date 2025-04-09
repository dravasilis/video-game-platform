"use client";
import styles from "../../../games/[id]/page.module.scss";

interface Props {
  appliedFilter: string;
  filterName: string;
  filterSlug: string;
  clearFilter: (filterName: string) => void;
}

const AppliedFilter = ({
  appliedFilter,
  filterSlug,
  clearFilter,
}: Props) => {
  return (
    <div className="flex items-center gap-1">
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
