"use client";

import { useRef, useState } from "react";
import { ChartCardHeader } from "./ChartCardHeader";
import { ChartGrid } from "./ChartGrid";
import { smoothPath } from "./chartMath";

const Y_LABELS = [200, 150, 100, 50, 0];

const WIDTH = 476;
const HEIGHT = 192;

export type LinePoint = { label: string; value: number };

export function LineChartCard({
  title,
  points,
  pinnedIndex,
}: {
  title: string;
  points: LinePoint[];
  pinnedIndex?: number;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(pinnedIndex ?? null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxValue = Y_LABELS[0];

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * WIDTH,
    y: HEIGHT - (p.value / maxValue) * HEIGHT,
  }));

  const path = smoothPath(coords);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relativeX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    coords.forEach((c, i) => {
      const dist = Math.abs(c.x - relativeX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  const hovered = hoverIndex !== null ? { point: points[hoverIndex], coord: coords[hoverIndex] } : null;
  const tooltipFlip = hovered ? hovered.coord.x > WIDTH * 0.7 : false;

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
          <div
            ref={containerRef}
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIndex(pinnedIndex ?? null)}
            className="relative flex-1 min-w-0 h-[207px] pt-[8px] cursor-crosshair"
          >
            <div className="relative w-full h-[192px]">
              <ChartGrid />
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full overflow-visible"
              >
                {hovered && (
                  <line
                    x1={hovered.coord.x}
                    x2={hovered.coord.x}
                    y1={0}
                    y2={HEIGHT}
                    stroke="#dcdcdc"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                <path
                  d={path}
                  fill="none"
                  stroke="#a648fe"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
                {coords.map((c, i) => (
                  <circle
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    r={hoverIndex === i ? 5 : 4}
                    fill="#a648fe"
                    stroke="#fff"
                    strokeWidth={hoverIndex === i ? 2 : 0}
                    className="transition-[r] duration-100"
                  />
                ))}
              </svg>

              {hovered && (
                <div
                  className="absolute z-10 flex flex-col gap-[6px] items-start p-[8px] rounded-[8px] border border-[#eeeff1] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)] whitespace-nowrap pointer-events-none transition-[left,top] duration-100"
                  style={{
                    left: tooltipFlip ? hovered.coord.x - 10 : hovered.coord.x + 10,
                    top: Math.max(hovered.coord.y - 46, 0),
                    transform: tooltipFlip ? "translateX(-100%)" : undefined,
                  }}
                >
                  <p className="font-normal text-[#8f8f8f] text-[11px] leading-[14px] border-b border-dashed border-[#dbdbdb] pb-px">
                    {hovered.point.label}
                  </p>
                  <p className="font-medium text-[#a648fe] text-[13px] leading-[16px]">{hovered.point.value}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between font-medium leading-[16px] pl-[31px] text-[#8f8f8f] text-[12px] text-center w-full">
          {points.map((p, i) => (
            <p key={i} className="shrink-0">
              {p.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
