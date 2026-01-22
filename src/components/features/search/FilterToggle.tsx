type FilterToggleProps = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export function FilterToggle({
  checked,
  onChange,
  disabled = false,
}: FilterToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`ml-auto relative inline-flex h-5 w-9 items-center rounded-full transition-colors
        ${checked ? "bg-blue-600" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? "translate-x-4" : "translate-x-1"}
        `}
      />
    </button>
  );
}
