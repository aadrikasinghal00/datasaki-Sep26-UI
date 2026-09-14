"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartColumnIncreasingIcon,
  ChartLineData01Icon,
  PieChart01Icon,
  GridTableIcon,
  GridViewIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

const WIDGET_TYPES = [
  { id: "bar", label: "Bar chart", icon: ChartColumnIncreasingIcon },
  { id: "line", label: "Line chart", icon: ChartLineData01Icon },
  { id: "pie", label: "Pie chart", icon: PieChart01Icon },
  { id: "table", label: "Table", icon: GridTableIcon },
  { id: "other", label: "Other", icon: GridViewIcon },
] as const;

export function GenerateWidgetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [widgetType, setWidgetType] = useState<string>("other");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setWidgetType("other");
      setName("");
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const canSubmit = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative bg-white rounded-[12px] border border-[#ebebeb] shadow-[0px_20px_48px_rgba(0,0,0,0.16)] w-full max-w-[540px] max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between gap-[16px] p-[20px] pb-[16px]">
          <h2 className="font-medium text-[16px] text-[#2c2c2e] tracking-[-0.15px]">Generate AI Widget</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] text-[#8f8f8f] hover:bg-[#f6f6f6] hover:text-[#4b4b4b] transition-colors duration-150"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[20px] px-[20px] pb-[20px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[11px] font-medium text-[#9a9a9a] tracking-wide uppercase">Widget Type</p>
            <div className="grid grid-cols-5 gap-[8px]">
              {WIDGET_TYPES.map((type) => {
                const isSelected = widgetType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setWidgetType(type.id)}
                    className={`flex flex-col items-center justify-center gap-[8px] py-[14px] px-[4px] rounded-[8px] border transition-colors duration-150 ${
                      isSelected
                        ? "border-[#ebebeb] bg-[#f6f6f6] text-[#2c2c2e]"
                        : "border-[#ebebeb] text-[#8f8f8f] hover:bg-[#fafafa]"
                    }`}
                  >
                    <HugeiconsIcon icon={type.icon} size={18} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
                    <span className="text-[12px] font-medium leading-none whitespace-nowrap">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="widget-name" className="text-[13px] font-medium text-[#3b3b3b]">
              Widget Name <span className="text-[#9a9a9a] font-normal">(Optional)</span>
            </label>
            <input
              id="widget-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Machine Alarm Summary"
              className="w-full border border-[#ebebeb] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#2c2c2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c7c7c7] transition-colors duration-150"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="widget-query" className="text-[13px] font-medium text-[#3b3b3b]">
              Query <span className="text-[#f65753]">*</span>
            </label>
            <textarea
              id="widget-query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Show all machines with their alarm counts and last stop reason."
              rows={4}
              className="w-full resize-none border border-[#ebebeb] rounded-[8px] px-[12px] py-[10px] text-[14px] text-[#2c2c2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c7c7c7] transition-colors duration-150"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[10px] px-[20px] py-[16px] border-t border-[#ebebeb]">
          <button
            type="button"
            onClick={onClose}
            className="h-[34px] px-[14px] rounded-[6px] text-[14px] font-medium text-[#4b4b4b] hover:bg-[#f6f6f6] transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onClose}
            className={`h-[34px] px-[14px] rounded-[6px] text-[14px] font-medium transition-colors duration-150 ${
              canSubmit ? "bg-[#202020] text-white hover:bg-[#333]" : "bg-[#efefef] text-[#b4b4b4] cursor-not-allowed"
            }`}
          >
            Add to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
