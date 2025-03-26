import { Suspense } from "react";
import SearchResults from "../components/search-results/search-results";

const SearchPage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
