interface MedicineIconProps {
  className?: string;
  size?: number;
}

export default function MedicineIcon({
  className = "",
  size = 24,
}: MedicineIconProps) {
  return (
    <div
      className={`bg-[#7d7d7d] flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
      data-node-id="293:341"
    >
      <div
        className="aspect-square flex-[1_0_0] min-h-px min-w-px overflow-clip relative"
        data-name="healthicons:medicines"
        data-node-id="293:342"
      >
        <div
          className="absolute contents inset-[12.5%_12.5%_12.51%_12.5%]"
          data-name="Group"
          data-node-id="293:343"
        >
          <div
            className="absolute inset-[12.5%_12.5%_54.17%_54.17%]"
            data-name="Vector"
            data-node-id="293:344"
          >
            <img
              alt="Medicine tablet"
              className="block max-w-none size-full"
              src="/icons/medicine/icon-pill-tablet.svg"
            />
          </div>
          <div
            className="absolute bottom-1/2 left-[12.5%] right-[54.17%] top-[16.67%]"
            data-name="Vector"
            data-node-id="293:345"
          >
            <img
              alt="Medicine pill"
              className="block max-w-none size-full"
              src="/icons/medicine/icon-pill-triangle.svg"
            />
          </div>
          <div
            className="absolute inset-[51.92%_19.06%_12.51%_33.28%]"
            data-name="Vector"
            data-node-id="293:346"
          >
            <img
              alt="Medicine capsule"
              className="block max-w-none size-full"
              src="/icons/medicine/icon-med-triangle.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
