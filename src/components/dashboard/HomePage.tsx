"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  ChartNoAxesColumnIcon,
  ArrowDown01Icon,
  ArrowUp02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { StepIcon } from "./copilot/StepIcon";

const STROKE_WIDTH = 1.15;

const SUGGESTED_ACTIONS = [
  "What happened on the floor today?",
  "Which machine needs my attention right now?",
  "How did this shift compare to yesterday?",
  "What's causing the most downtime this week?",
  "Give me a handover summary before shift change",
];

export function HomePage({ onAsk }: { onAsk: (text: string) => void }) {
  const [value, setValue] = useState("");
  const canSend = value.trim().length > 0;

  function submit() {
    if (!canSend) return;
    onAsk(value.trim());
    setValue("");
  }

  return (
    <div className="no-scrollbar flex flex-col items-center h-full overflow-y-auto px-[16px] pt-[200px] pb-[60px]">
      <div className="flex flex-col items-center gap-[32px] w-full max-w-[628px]">
        <div className="flex flex-col items-center gap-[12px] text-center">
          <h1 className="font-medium text-[24px] text-[#2c2c2e] tracking-[-0.2px]">Good Afternoon, Karry</h1>
          <p className="text-[14px] text-[#8f8f8f] leading-[20px]">
            There&rsquo;s 1 predictive alert on Conveyor B that needs review before shift change.
          </p>
        </div>

        <div className="border border-[#ebebeb] border-solid bg-white rounded-[12px] p-[16px] flex flex-col gap-[16px] w-full shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything..."
            rows={1}
            className="w-full resize-none bg-transparent outline-none text-[14px] leading-[20px] text-[#2c2c2e] placeholder:text-[#9a9a9a] font-normal"
          />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                aria-label="Attach"
                className="flex items-center justify-center size-[20px] rounded-[6px] text-[#6b6b6b] hover:bg-[#f1f1f1] transition-colors duration-150"
              >
                <HugeiconsIcon icon={PlusSignIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              </button>
              <button
                type="button"
                className="flex items-center gap-[6px] h-[20px] px-[6px] rounded-[6px] text-[#3b3b3b] hover:bg-[#f1f1f1] transition-colors duration-150"
              >
                <span className="text-[#4f89fd] flex items-center">
                  <HugeiconsIcon icon={ChartNoAxesColumnIcon} size={13} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
                </span>
                <span className="text-[13px] font-medium">Analytical</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              </button>
            </div>
            <button
              type="button"
              aria-label="Send"
              onClick={submit}
              disabled={!canSend}
              className={`flex items-center justify-center size-[24px] rounded-full transition-colors duration-150 ${
                canSend ? "bg-[#202020] text-white hover:bg-[#333]" : "bg-[#efefef] text-[#b4b4b4] cursor-not-allowed"
              }`}
            >
              <HugeiconsIcon icon={ArrowUp02Icon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] w-full mt-[30px]">
          <p className="text-[14px] font-medium text-[#3b3b3b]">Suggested Actions</p>
          <div className="flex flex-col">
            {SUGGESTED_ACTIONS.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => onAsk(text)}
                className="flex items-center gap-[8px] w-full text-left py-[10px] px-[4px] rounded-[8px] hover:bg-[#f0f0f0] transition-colors duration-150"
              >
                <StepIcon size={20} />
                <span className="flex-1 text-[14px] text-[#3b3b3b] font-normal">{text}</span>
                <span className="shrink-0 size-[16px] text-[#9a9a9a]">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
