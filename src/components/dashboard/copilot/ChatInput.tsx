"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Mic01Icon, ArrowUp02Icon, StopIcon } from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

export function ChatInput({
  isStreaming,
  onSend,
  onStop,
  autoFocus,
}: {
  isStreaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0;

  function handleSend() {
    if (!canSend || isStreaming) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handlePrimaryClick() {
    if (isStreaming) {
      onStop();
    } else {
      handleSend();
    }
  }

  return (
    <div className="border border-[#ebebeb] border-solid bg-white rounded-[10px] p-[12px] flex flex-col gap-[10px] w-full shadow-[0px_6px_20px_rgba(0,0,0,0.1)]">
      <textarea
        ref={textareaRef}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          setValue(e.target.value);
          const el = e.target;
          el.style.height = "auto";
          el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        rows={1}
        className="w-full resize-none bg-transparent outline-none text-[14px] leading-[20px] text-[#2c2c2e] placeholder:text-[#9a9a9a] font-normal max-h-[96px]"
      />
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          aria-label="Attach"
          className="flex items-center justify-center size-[28px] rounded-[8px] text-[#6b6b6b] hover:bg-[#f1f1f1] transition-colors duration-150"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
        </button>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            aria-label="Voice input"
            className="flex items-center justify-center size-[28px] rounded-[8px] text-[#6b6b6b] hover:bg-[#f1f1f1] transition-colors duration-150"
          >
            <HugeiconsIcon icon={Mic01Icon} size={16} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </button>
          <button
            type="button"
            aria-label={isStreaming ? "Stop response" : "Send message"}
            onClick={handlePrimaryClick}
            disabled={!isStreaming && !canSend}
            className={`flex items-center justify-center size-[28px] rounded-[8px] transition-all duration-200 ${
              isStreaming
                ? "bg-[#202020] text-white"
                : canSend
                ? "bg-[#202020] text-white hover:bg-[#333]"
                : "bg-[#efefef] text-[#b4b4b4] cursor-not-allowed"
            }`}
          >
            <HugeiconsIcon
              icon={isStreaming ? StopIcon : ArrowUp02Icon}
              size={isStreaming ? 14 : 16}
              strokeWidth={STROKE_WIDTH}
              absoluteStrokeWidth
            />
          </button>
        </div>
      </div>
    </div>
  );
}
