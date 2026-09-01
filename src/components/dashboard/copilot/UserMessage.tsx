"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit04Icon, Copy01Icon } from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

export function UserMessage({ text }: { text: string }) {
  return (
    <div className="group flex flex-col items-end gap-[8px] w-full">
      <div className="bg-[#f0f0f0] text-[#2c2c2e] rounded-[12px] rounded-tr-[4px] px-[16px] py-[10px] max-w-[65%] text-[14px] leading-[20px]">
        {text}
      </div>
      <div className="flex gap-[6px] items-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          type="button"
          aria-label="Edit message"
          className="flex items-center justify-center size-[20px] rounded-[4px] text-[#8f8f8f] hover:bg-[#f0f0f0] hover:text-[#4b4b4b] transition-colors duration-150"
        >
          <HugeiconsIcon icon={Edit04Icon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
        <button
          type="button"
          aria-label="Copy message"
          onClick={() => navigator.clipboard?.writeText(text)}
          className="flex items-center justify-center size-[20px] rounded-[4px] text-[#8f8f8f] hover:bg-[#f0f0f0] hover:text-[#4b4b4b] transition-colors duration-150"
        >
          <HugeiconsIcon icon={Copy01Icon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
      </div>
    </div>
  );
}
