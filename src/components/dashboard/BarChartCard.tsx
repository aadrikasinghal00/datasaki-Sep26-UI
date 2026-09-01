"use client";

import { useState } from "react";
import { ChartCardHeader } from "./ChartCardHeader";
import { ChartGrid } from "./ChartGrid";

const Y_LABELS = [200, 150, 100, 50, 0];

export type BarPoint = { label: string; value: number };

export function BarChartCard({ title, bars }: { title: string; bars: BarPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const maxValue = Y_LABELS[0];

  return (
    <div className="bg-white border border-[#ebebeb] border-solid flex flex-col gap-[23px] items-start overflow-hidden p-[14px] rounded-[7px] size-full">
      <ChartCardHeader title={title} />
      <div className="flex flex-col gap-[10px] items-start overflow-hidden w-full">
        <div className="flex gap-[10px] items-start w-full">
          <div className="flex flex-col h-[207px] items-end justify-between shrink-0 text-[#8f8f8f] text-[12px] font-medium leading-[16px] text-right">
            {Y_LABELS.map((label) => (
              <p key={label} className="w-full">
                {label}
              </p>
            ))}
          </div>
          <div className="h-[207px] overflow-visible relative flex-1 min-w-0 pt-[8px]">
            <div className="relative h-[192px] w-full">
              <ChartGrid />
              <div className="absolute inset-0 flex items-end justify-start gap-[64px] pl-[25px]">
                {bars.map((bar, i) => {
                  const heightPercent = (bar.value / maxValue) * 100;
                  const isHovered = hoverIndex === i;
                  return (
                    <div
                      key={i}
                      className="relative h-full flex flex-col justify-end items-center"
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      {isHovered && (
                        <div
                          className="absolute z-10 flex items-center px-[8px] py-[4px] rounded-[6px] border border-[#eeeff1] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)] whitespace-nowrap pointer-events-none"
                          style={{ bottom: `calc(${heightPercent}% + 10px)` }}
                        >
                          <p className="font-medium text-[#4f89fd] text-[13px] leading-[16px]">{bar.value}</p>
                        </div>
                      )}
                      <div
                        className={`rounded-[4px] w-[24px] transition-[height,background-color] duration-150 ease-out ${
                          isHovered ? "bg-[#3d74e8]" : "bg-[#4f89fd]"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[18px] items-center font-medium leading-[16px] pl-[32px] text-[#8f8f8f] text-[12px] text-center w-full whitespace-nowrap">
          {bars.map((bar, i) => (
            <p key={i}>{bar.label}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
