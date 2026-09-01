"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatInput } from "./ChatInput";
import { ChatWidgetCard } from "./ChatWidgetCard";
import { ThinkingText } from "./ThinkingText";
import { CopilotIcon } from "./CopilotIcon";
import type { ChatMessage } from "./types";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `panel-msg-${idCounter}`;
}

function generateAssistantReply(question: string) {
  const lower = question.toLowerCase();
  const showsWidget = lower.includes("machine") || lower.includes("oee");
  const text = showsWidget
    ? "Line 3's HPLC-04 unit is the biggest drag on fleet OEE today — availability dropped after an unplanned changeover. Here's the sample throughput trend against its usual baseline instrument:"
    : "Based on the last 7 days of sensor and batch data, the biggest active risk is a stability-sample deviation trending upward on Conveyor B. I'd recommend reviewing the calibration log before the next shift change.";

  return {
    text,
    widget: showsWidget
      ? {
          title: "Sample by Instrument",
          line: [
            { label: "Aug 9", value: 155 },
            { label: "Aug 11", value: 140 },
            { label: "Aug 13", value: 70 },
            { label: "Aug 15", value: 48 },
            { label: "Aug 17", value: 93 },
            { label: "Aug 19", value: 65 },
          ],
          annotateIndex: 4,
          bars: [],
        }
      : undefined,
  };
}

function PanelMessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end w-full">
        <div className="bg-[#f0f0f0] text-[#2c2c2e] rounded-[12px] rounded-tr-[4px] px-[14px] py-[10px] max-w-[85%] text-[14px] leading-[20px]">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px] w-full">
      {message.status === "thinking" ? (
        <ThinkingText />
      ) : (
        <>
          {message.text && (
            <p className="text-[14px] leading-[20px] text-[#2c2c2e] whitespace-pre-wrap">{message.text}</p>
          )}
          {message.widget && <ChatWidgetCard widget={message.widget} />}
        </>
      )}
    </div>
  );
}

export function CopilotPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedTopRef = useRef(0);
  const messageNodeRefs = useRef(new Map<string, HTMLDivElement>());
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const id = lastUserIdRef.current;
    const container = scrollRef.current;
    if (!id || !container) return;
    const node = messageNodeRefs.current.get(id);
    if (!node) return;
    const top = node.offsetTop - 8;
    pinnedTopRef.current = top;
    container.scrollTop = top;
  }, [messages]);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    if (container.scrollTop < pinnedTopRef.current) {
      container.scrollTop = pinnedTopRef.current;
    }
  }

  function sendMessage(text: string) {
    const userId = nextId();
    const assistantId = nextId();
    lastUserIdRef.current = userId;

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text },
      { id: assistantId, role: "assistant", status: "thinking" },
    ]);
    setStreamingId(assistantId);

    timeoutRef.current = setTimeout(() => {
      const reply = generateAssistantReply(text);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { id: assistantId, role: "assistant", status: "done", text: reply.text, widget: reply.widget }
            : m
        )
      );
      setStreamingId(null);
    }, 1800);
  }

  function stopStreaming() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!streamingId) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === streamingId ? { id: streamingId, role: "assistant", status: "done", text: "Stopped." } : m))
    );
    setStreamingId(null);
  }

  const hasMessages = messages.length > 0;

  return (
    <div
      className={`shrink-0 h-full bg-[#fafafa] border-l border-[#ebebeb] overflow-hidden transition-[width] duration-300 ease-in-out ${
        open ? "w-[356px]" : "w-0"
      }`}
    >
      <div
        className={`w-[356px] h-full flex flex-col transition-opacity duration-300 ease-out ${
          open ? "opacity-100 delay-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[54px] px-[16px] shrink-0 border-b border-[#ebebeb] bg-[#fafafa]">
          <div className="flex items-center gap-[8px]">
            <CopilotIcon size={15} radius={4} />
            <p className="font-medium text-[14px] text-[#2c2c2e] tracking-[-0.15px]">Datasaki Copilot</p>
          </div>
          <button
            type="button"
            aria-label="Close Co-Pilot"
            onClick={onClose}
            className="flex items-center justify-center size-[24px] rounded-md text-[#6b6b6b] hover:bg-[#f1f1f1] transition-colors duration-150"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={15} strokeWidth={1.15} absoluteStrokeWidth />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 min-h-0 flex flex-col">
          {hasMessages ? (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-[16px] py-[16px] flex flex-col gap-[16px]"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  ref={(node) => {
                    if (node) messageNodeRefs.current.set(m.id, node);
                    else messageNodeRefs.current.delete(m.id);
                  }}
                >
                  <PanelMessageBubble message={m} />
                </div>
              ))}
              <div className="h-[8px] shrink-0" />
            </div>
          ) : (
            <ChatEmptyState onPick={sendMessage} />
          )}

          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[28px] bg-gradient-to-t from-[#fafafa] to-transparent" />
        </div>

        {/* Input */}
        <div className="px-[16px] pb-[16px] pt-[4px] shrink-0">
          <ChatInput isStreaming={streamingId !== null} onSend={sendMessage} onStop={stopStreaming} />
        </div>
      </div>
    </div>
  );
}
