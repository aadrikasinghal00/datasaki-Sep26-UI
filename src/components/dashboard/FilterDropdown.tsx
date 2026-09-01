"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar04Icon, ChevronsLeftRightIcon, FilterHorizontalIcon, Tick02Icon } from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

function useClickOutside(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onOutside]);
  return ref;
}

const TRIGGER_CLASSES =
  "border border-[#ebebeb] border-solid flex gap-[6px] h-[30px] items-center justify-center px-[12px] rounded-[6px] text-[#4b4b4b] hover:bg-[#f9f9f9] transition-colors duration-150";

export function DateRangeDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} className={TRIGGER_CLASSES}>
        <HugeiconsIcon icon={Calendar04Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">{value}</span>
        <span className="rotate-90 flex items-center justify-center size-[14px]">
          <HugeiconsIcon icon={ChevronsLeftRightIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-[36px] z-30 w-[176px] bg-white border border-[#ebebeb] rounded-[6px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] p-[4px] flex flex-col gap-[2px]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`text-left px-[10px] py-[7px] rounded-[6px] text-[14px] tracking-[-0.15px] transition-colors duration-150 ${
                opt === value ? "bg-[#f6f6f6] text-[#2c2c2e] font-medium" : "text-[#3b3b3b] font-normal hover:bg-[#f6f6f6]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const FILTER_GROUPS: { label: string; options: string[] }[] = [
  { label: "Instrument", options: ["HPLC-01", "HPLC-02", "HPLC-03", "HPLC-04"] },
  { label: "Shift", options: ["Morning", "Evening", "Night"] },
];

export function FilterDropdown({
  selected,
  onToggle,
}: {
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} className={TRIGGER_CLASSES}>
        <HugeiconsIcon icon={FilterHorizontalIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">Filter</span>
        {selected.size > 0 && (
          <span className="flex items-center justify-center min-w-[16px] h-[16px] px-[4px] rounded-full bg-[rgba(119,119,119,0.12)] text-[#777] text-[10px] font-medium">
            {selected.size}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute left-0 top-[36px] z-30 w-[200px] bg-white border border-[#ebebeb] rounded-[6px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] p-[10px] flex flex-col gap-[14px]">
          {FILTER_GROUPS.map((group, i) => (
            <div key={group.label} className={`flex flex-col gap-[4px] ${i > 0 ? "pt-[10px] border-t border-[#ebebeb]" : ""}`}>
              <p className="px-[6px] text-[12px] font-medium text-[#8f8f8f]">{group.label}</p>
              <div className="flex flex-col">
                {group.options.map((opt) => {
                  const isChecked = selected.has(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onToggle(opt)}
                      className="flex items-center gap-[8px] px-[6px] py-[7px] rounded-[6px] hover:bg-[#f6f6f6] transition-colors duration-150 text-left"
                    >
                      <span
                        className={`flex items-center justify-center shrink-0 size-[14px] rounded-[4px] border transition-colors duration-150 ${
                          isChecked ? "bg-[#202020] border-[#202020] text-white" : "border-[#dcdcdc] text-transparent"
                        }`}
                      >
                        <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={2} absoluteStrokeWidth />
                      </span>
                      <span className="text-[14px] tracking-[-0.15px] text-[#3b3b3b]">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
