"use client";

import { useEffect, useRef, useState } from "react";
import { TopBar } from "../TopBar";
import { ChatInput } from "./ChatInput";
import { ChatEmptyState } from "./ChatEmptyState";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import type { ChatMessage } from "./types";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

function titleFromMessage(text: string) {
  const words = text.trim().split(/\s+/).slice(0, 6).join(" ");
  return words.length < text.trim().length ? `${words}…` : words;
}

function generateAssistantReply(question: string) {
  const lower = question.toLowerCase();
  const showsWidget = lower.includes("machine") || lower.includes("oee");
  const text = showsWidget
    ? "Line 3's HPLC-04 unit is the biggest drag on fleet OEE today — availability dropped after an unplanned changeover. Here's the sample throughput trend against its usual baseline instrument:"
    : "Based on the last 7 days of sensor and batch data, the biggest active risk is a stability-sample deviation trending upward on Conveyor B. I'd recommend reviewing the calibration log before the next shift change.";

  return {
    text,
    steps: 2,
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

export function ChatConversationView({ initialMessage }: { initialMessage?: string | null }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [title, setTitle] = useState("New chat");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedTopRef = useRef(0);
  const messageNodeRefs = useRef(new Map<string, HTMLDivElement>());
  const lastUserIdRef = useRef<string | null>(null);
  const consumedInitialRef = useRef(false);

  useEffect(() => {
    if (consumedInitialRef.current || !initialMessage) return;
    consumedInitialRef.current = true;
    sendMessage(initialMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

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
    setTitle((prev) => (prev === "New chat" ? titleFromMessage(text) : prev));

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
            ? { id: assistantId, role: "assistant", status: "done", text: reply.text, steps: reply.steps, widget: reply.widget }
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

  return (
    <div className="flex flex-col h-full min-w-0">
      <div className="sticky top-0 z-20 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#ebebeb]/70 shrink-0">
        <TopBar variant="chat" activeTab="" onSelectTab={() => {}} chatTitle={title} />
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        {messages.length === 0 ? (
          <ChatEmptyState onPick={sendMessage} />
        ) : (
          <div ref={scrollRef} onScroll={handleScroll} className="no-scrollbar flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-[24px] items-center w-full px-[16px] py-[24px]">
              <div className="flex flex-col gap-[24px] w-full max-w-[636px]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    ref={(node) => {
                      if (node) messageNodeRefs.current.set(m.id, node);
                      else messageNodeRefs.current.delete(m.id);
                    }}
                  >
                    {m.role === "user" ? <UserMessage text={m.text} /> : <AssistantMessage message={m} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[36px] bg-gradient-to-t from-[#fafafa] to-transparent" />

        <div className="flex justify-center w-full px-[16px] pb-[24px] pt-[8px] shrink-0">
          <div className="w-full max-w-[636px]">
            <ChatInput isStreaming={streamingId !== null} onSend={sendMessage} onStop={stopStreaming} />
          </div>
        </div>
      </div>
    </div>
  );
}
