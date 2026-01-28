import React from "react";
import Image from "next/image";

interface MedicineIconProps {
  size?: number;
  className?: string;
}

export default function MedicineIcon({
  size = 400,
  className = "",
}: MedicineIconProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Top Row: Triangle and Circle */}
      <div className="flex items-center justify-center gap-12">
        <Image
          src="/icons/medicine/icon-pill-triangle.svg"
          alt="Medicine Triangle"
          width={size * 0.4}
          height={size * 0.4}
          className="object-contain"
        />
        <Image
          src="/icons/medicine/icon-med-triangle.svg"
          alt="Medicine Circle"
          width={size * 0.4}
          height={size * 0.4}
          className="object-contain"
        />
      </div>

      {/* Bottom: Pill/Capsule */}
      <div className="flex items-center justify-center">
        <Image
          src="/icons/medicine/icon-pill-tablet.svg"
          alt="Medicine Pill"
          width={size * 0.55}
          height={size * 0.4}
          className="object-contain"
        />
      </div>
    </div>
  );
}
