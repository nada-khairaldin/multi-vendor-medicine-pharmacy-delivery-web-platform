"use client";

import { FaSearch } from "react-icons/fa";
import { SearchDropdown } from "./SearchDropdown";
import { useSearchContext } from "@/src/contexts/SearchContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";

export default function SearchBox() {
  const { query, setQuery, setOpen, inputRef } = useSearchContext();

  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  });

  return (
    <div ref={containerRef} className="relative w-full lg:w-[50%]">
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl h-12">
        <FaSearch className="text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search medicine, pharmacy..."
          className="bg-transparent outline-none w-full text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <SearchDropdown />
    </div>
  );
}
