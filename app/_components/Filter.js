"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

function Filter() {
  const searchParms = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParms.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParms);

    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </FilterButton>

      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guess
      </FilterButton>

      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guess
      </FilterButton>

      <FilterButton
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guess
      </FilterButton>
    </div>
  );
}

export default Filter;
