import { useSearchContext } from "@/contexts/SearchContext";
import { useSearchRecents } from "@/hooks/search/useSearchRecents";
import { FaHistory } from "react-icons/fa";

export function SearchDefaultState() {
  const { recents, setRecents, STORAGE_KEY } = useSearchRecents();
  const { handleSelect } = useSearchContext();

  const clearRecents = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEY);
    setRecents([]);
  };

  return (
    <div className="space-y-4 p-3 md:p-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-500 text-xs md:text-sm">
            Recents
          </p>
          <button
            className="text-gray-500 text-xs hover:text-gray-700 transition-colors"
            onClick={clearRecents}
          >
            Clear All
          </button>
        </div>
        {recents.length !== 0 ? (
          <ul className="space-y-1.5 md:space-y-2">
            {recents.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 hover:bg-gray-100 px-2 md:px-3 py-2 rounded text-xs md:text-sm cursor-pointer transition-colors"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
              >
                <FaHistory className="text-gray-500 w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                <span className="truncate">{item.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 md:py-4 text-gray-500 text-xs md:text-sm text-center">
            No recent searches
          </p>
        )}
      </div>
    </div>
  );
}
