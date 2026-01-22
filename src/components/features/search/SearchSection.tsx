'"use client";';

import { SearchResult } from "@/src/types/search";
import { useSearchContext } from "@/src/contexts/SearchContext";

type Props = {
  title: string;
  icon: string;
  items: SearchResult[];
  offset: number;
  onSelect?: (item: SearchResult) => void;
};

export function SearchSection({ title, icon, items, onSelect }: Props) {
  const { query } = useSearchContext();

  return (
    <>
      {items.length !== 0 ? (
        <div>
          <p className="mb-2 font-semibold text-gray-500 text-xs">
            Suggestions
          </p>
          <ul className="space-y-2">
            {items.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-2 hover:bg-gray-200 px-2 py-2 rounded cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelect?.(item)}
                >
                  <span className="mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.subtitle}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="py-4 text-gray-500 text-sm text-center">
          No Found {title} for {query}
        </p>
      )}
    </>
  );
}
