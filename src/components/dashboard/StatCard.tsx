import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { CommandIcon } from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

export type StatCardData = {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  period: string;
};

export function StatCard({ label, value, trend, trendDirection, period }: StatCardData) {
  const isUp = trendDirection === "up";
  return (
    <div className="bg-white border border-[#ebebeb] border-solid flex flex-col items-start justify-between overflow-hidden p-[12px] rounded-[7px] size-full">
      <div className="flex flex-col gap-[12px] items-start w-full">
        <div className="flex gap-[4px] items-center w-full text-[#8f8f8f]">
          <div className="shrink-0 size-[12px]">
            <HugeiconsIcon icon={CommandIcon} size={12} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </div>
          <div className="border-[#e3e3e3] border-b border-dashed flex items-center justify-center py-px shrink-0">
            <span className="font-medium leading-none text-[12px] whitespace-nowrap">{label}</span>
          </div>
        </div>
        <div className="font-medium leading-none text-[#424355] text-[20px] tracking-[-0.15px] w-full">
          {value}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-[4px] items-center">
          <span
            className={`font-medium leading-none text-[12px] tracking-[-0.24px] ${
              isUp ? "text-[#41cf8f]" : "text-[#f65753]"
            }`}
          >
            {trend}
          </span>
          <Image
            src={isUp ? "/design-assets/trend-up.svg" : "/design-assets/trend-down.svg"}
            alt=""
            width={12}
            height={12}
            className="shrink-0"
          />
        </div>
        <span className="font-medium leading-none text-[#8f8f8f] text-[12px] tracking-[-0.24px] whitespace-nowrap">
          {period}
        </span>
      </div>
    </div>
  );
}
