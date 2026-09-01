"use client";

import { useState } from "react";
import { ChartCardHeader } from "../ChartCardHeader";
import { ChartGrid } from "../ChartGrid";
import { LineChartCard } from "../LineChartCard";
import type { WidgetData } from "./types";

export function ChatWidgetCard({ widget }: { widget: WidgetData }) {
  if (widget.line && widget.line.length > 0) {
    return (
      <div className="w-full">
        <LineChartCard title={widget.title} points={widget.line} pinnedIndex={widget.annotateIndex} />
      </div>
    );
  }

  return <BarWidget widget={widget} />;
}

function BarWidget({ widget }: { widget: WidgetData }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const maxValue = Math.max(...widget.bars.map((b) => b.value)) * 1.2;
  const yLabels = [maxValue, maxValue * 0.5, 0].map((v) => Math.round(v));

  return (
    <div className="bg-white border border-[#ebebeb] border-solid flex flex-col gap-[16px] items-start overflow-hidden p-[14px] rounded-[7px] w-full">
      <ChartCardHeader title={widget.title} />
      <div className="flex gap-[10px] items-start w-full">
        <div className="flex flex-col h-[120px] items-end justify-between shrink-0 text-[#8f8f8f] text-[11px] font-medium leading-[14px] text-right">
          {yLabels.map((label) => (
            <p key={label} className="w-full">
              {label}
            </p>
          ))}
        </div>
        <div className="relative flex-1 min-w-0 h-[120px] pt-[4px]">
          <ChartGrid />
          <div className="absolute inset-0 flex items-end justify-center gap-[32px]">
            {widget.bars.map((bar, i) => {
              const heightPercent = (bar.value / maxValue) * 100;
              const isHovered = hoverIndex === i;
              return (
                <div
                  key={i}
                  className="relative h-full flex flex-col justify-end items-center flex-1 max-w-[48px]"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {isHovered && (
                    <div
                      className="absolute z-10 flex items-center px-[6px] py-[3px] rounded-[6px] border border-[#eeeff1] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)] whitespace-nowrap pointer-events-none"
                      style={{ bottom: `calc(${heightPercent}% + 8px)` }}
                    >
                      <p className="font-medium text-[#4f89fd] text-[12px] leading-[14px]">
                        {bar.value}
                        {widget.unit ?? ""}
                      </p>
                    </div>
                  )}
                  <div
                    className={`rounded-[3px] w-[20px] transition-[height,background-color] duration-150 ease-out ${
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
      <div className="flex items-center justify-center gap-[32px] w-full pl-[calc(1.5em+10px)]">
        {widget.bars.map((bar, i) => (
          <p key={i} className="flex-1 max-w-[48px] text-center text-[11px] text-[#8f8f8f] font-medium truncate">
            {bar.label}
          </p>
        ))}
      </div>
    </div>
  );
}
