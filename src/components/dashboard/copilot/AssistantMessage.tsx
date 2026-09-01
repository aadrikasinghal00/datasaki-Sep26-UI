"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ThumbsUpIcon, ThumbsDownIcon, Copy01Icon } from "@hugeicons/core-free-icons";
import { StepIcon } from "./StepIcon";
import { ThinkingText } from "./ThinkingText";
import { ChatWidgetCard } from "./ChatWidgetCard";
import type { ChatMessage } from "./types";

const STROKE_WIDTH = 1.15;

export function AssistantMessage({ message }: { message: Extract<ChatMessage, { role: "assistant" }> }) {
  const [stepsOpen, setStepsOpen] = useState(true);

  if (message.status === "thinking") {
    return (
      <div className="flex gap-[5px] items-center w-full">
        <StepIcon />
        <ThinkingText />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px] items-start w-full">
      {message.steps != null && (
        <button
          type="button"
          onClick={() => setStepsOpen((v) => !v)}
          className="flex gap-[5px] items-center"
        >
          <StepIcon />
          <span className="font-medium text-[12px] text-[#8f8f8f] tracking-[-0.15px]">
            Completed {message.steps} Steps
          </span>
          <span className={`text-[#8f8f8f] transition-transform duration-150 ${stepsOpen ? "" : "-rotate-90"}`}>
            <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </span>
        </button>
      )}

      {stepsOpen && (
        <>
          {message.text && (
            <p className="font-medium text-[14px] leading-[1.5] text-[#4b4b4b] tracking-[-0.15px] whitespace-pre-wrap">
              {message.text}
            </p>
          )}
          {message.widget && <ChatWidgetCard widget={message.widget} />}
        </>
      )}

      <div className="flex gap-[10px] items-center">
        <button
          type="button"
          aria-label="Good response"
          className="flex items-center justify-center size-[20px] rounded-[4px] text-[#8f8f8f] hover:bg-[#f0f0f0] hover:text-[#4b4b4b] transition-colors duration-150"
        >
          <HugeiconsIcon icon={ThumbsUpIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
        <button
          type="button"
          aria-label="Bad response"
          className="flex items-center justify-center size-[20px] rounded-[4px] text-[#8f8f8f] hover:bg-[#f0f0f0] hover:text-[#4b4b4b] transition-colors duration-150"
        >
          <HugeiconsIcon icon={ThumbsDownIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
        <button
          type="button"
          aria-label="Copy response"
          onClick={() => message.text && navigator.clipboard?.writeText(message.text)}
          className="flex items-center justify-center size-[20px] rounded-[4px] text-[#8f8f8f] hover:bg-[#f0f0f0] hover:text-[#4b4b4b] transition-colors duration-150"
        >
          <HugeiconsIcon icon={Copy01Icon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
      </div>
    </div>
  );
}
