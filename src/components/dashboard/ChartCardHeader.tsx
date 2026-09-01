import { HugeiconsIcon } from "@hugeicons/react";
import { CommandIcon, MoreVerticalIcon } from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

export function ChartCardHeader({ title }: { title: string }) {
  return (
    <div className="flex gap-[10px] items-center justify-center w-full">
      <div className="flex flex-1 gap-[4px] items-center min-w-0 text-[#8f8f8f]">
        <div className="shrink-0 size-[12px]">
          <HugeiconsIcon icon={CommandIcon} size={12} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </div>
        <div className="border-[#dbdbdb] border-b border-dashed flex items-center justify-center py-px shrink-0">
          <span className="font-medium leading-none text-[12px] whitespace-nowrap">{title}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Widget options"
        className="shrink-0 size-[18px] flex items-center justify-center rounded text-[#8f8f8f] hover:bg-[#f3f3f3] hover:text-[#4b4b4b] transition-colors duration-150"
      >
        <HugeiconsIcon icon={MoreVerticalIcon} size={16} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
      </button>
    </div>
  );
}
