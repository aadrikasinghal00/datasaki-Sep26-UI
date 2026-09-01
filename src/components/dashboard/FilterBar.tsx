"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { DateRangeDropdown, FilterDropdown } from "./FilterDropdown";

const STROKE_WIDTH = 1.15;

const RANGE_OPTIONS = ["Today", "Last 1 week", "Last 30 days", "Last 90 days", "Custom range"];
const COMPARE_OPTIONS = ["Off", "Previous period", "Previous year"];

export function FilterBar() {
  const [range, setRange] = useState("Last 1 week");
  const [compare, setCompare] = useState("Off");
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [layoutSaved, setLayoutSaved] = useState(false);

  function toggleFilter(value: string) {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  return (
    <div className="flex items-center justify-between w-full px-[16px] py-[8px]">
      <div className="flex gap-[10px] items-start">
        <DateRangeDropdown value={range} onChange={setRange} options={RANGE_OPTIONS} />
        <DateRangeDropdown value={compare === "Off" ? "Compare" : compare} onChange={setCompare} options={COMPARE_OPTIONS} />
        <FilterDropdown selected={filters} onToggle={toggleFilter} />
      </div>
      <div className="flex gap-[10px] items-start">
        <button
          onClick={() => {
            setLayoutSaved(true);
            setTimeout(() => setLayoutSaved(false), 1600);
          }}
          className="border border-[#ebebeb] border-solid flex h-[30px] items-center justify-center px-[12px] rounded-[6px] text-[#4b4b4b] hover:bg-[#f9f9f9] transition-colors duration-150"
        >
          <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">
            {layoutSaved ? "Saved ✓" : "Save Layout"}
          </span>
        </button>
        <button className="bg-[#202020] flex gap-[4px] h-[30px] items-center justify-center px-[12px] rounded-[6px] text-white hover:bg-[#333] transition-colors duration-150">
          <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">
            Add Widget
          </span>
        </button>
      </div>
    </div>
  );
}
