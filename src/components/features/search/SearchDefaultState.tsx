import { useSearchContext } from "@/src/contexts/SearchContext";
import { useSearchRecents } from "@/src/hooks/search/useSearchRecents";
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
    <div className="space-y-4 p-4">
      <div>
        <div className="flex justify-between items-center">
          <p className="mb-2 font-semibold text-gray-500 text-sm">Recents</p>
          <button className="text-gray-500 text-xs" onClick={clearRecents}>
            Clear All
          </button>
        </div>
        {recents.length !== 0 ? (
          <ul className="space-y-2">
            {recents.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
              >
                <FaHistory className="text-gray-500" />
                {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-4 text-gray-500 text-sm text-center">
            No recent searches
          </p>
        )}
      </div>
    </div>
  );
}
