"use client";
import styles from "../../../games/[id]/page.module.scss";

interface Props {
  filterValue: string;
  filterName: string;
  filterTitle: string;
  isPlatforms?: boolean;
  clearFilter: (
    filterTitle: string,
    filterValue: string,
    isPlatforms?: boolean
  ) => void;
}

const AppliedFilter = ({
  filterValue,
  filterTitle,
  isPlatforms,
  clearFilter,
}: Props) => {
  console.log(filterTitle);
  console.log(filterValue);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => clearFilter(filterTitle, filterValue, isPlatforms)}
        className={`${styles.pill} cursor-pointer`}
      >
        {filterValue}
        <span className="text-primary-150">🞬</span>
      </button>
    </div>
  );
};

export default AppliedFilter;
