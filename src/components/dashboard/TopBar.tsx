"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Home02Icon,
  PlusSignIcon,
  BookOpen01Icon,
  Refresh01Icon,
  ArrowDown05Icon,
} from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

const TABS = ["Dashboard 1", "Dashboard 2", "Dashboard 3", "Dashboard 4"] as const;

export function TopBar({
  variant = "dashboard",
  activeTab,
  onSelectTab,
  chatTitle,
}: {
  variant?: "dashboard" | "home" | "chat";
  activeTab: string;
  onSelectTab: (tab: string) => void;
  chatTitle?: string;
}) {
  return (
    <div className="flex items-center justify-between px-[16px] h-[54px] shrink-0 w-full">
      <div className="flex gap-[16px] items-center min-w-0">
        {variant === "home" ? (
          <div className="flex gap-[8px] items-center shrink-0 text-[#3b3b3b]">
            <HugeiconsIcon icon={Home02Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            <p className="font-normal leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">Home</p>
          </div>
        ) : variant === "chat" ? (
          <div className="flex gap-[8px] items-center shrink-0 min-w-0 text-[#8f8f8f]">
            <HugeiconsIcon icon={Home02Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            <span className="font-normal leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">Home</span>
            <span className="font-normal leading-none text-[14px] text-[#c7c7c7]">/</span>
            <span className="font-normal leading-none text-[14px] tracking-[-0.15px] text-[#3b3b3b] truncate max-w-[240px]">
              {chatTitle}
            </span>
          </div>
        ) : (
          <>
            <div className="flex gap-[8px] items-center shrink-0 text-[#3b3b3b]">
              <HugeiconsIcon icon={DashboardCircleIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              <p className="font-normal leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">Dashboard</p>
            </div>
            <div className="w-px h-[19px] bg-[#e5e5e5] shrink-0" />
            <div className="no-scrollbar flex gap-[4px] items-center min-w-0 overflow-x-auto">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => onSelectTab(tab)}
                    className={`flex h-[30px] items-center justify-center px-[12px] rounded-[6px] shrink-0 transition-colors duration-150 whitespace-nowrap ${
                      isActive
                        ? "bg-[#f1f1f1] border-[#ebebeb] border-[0.6px] border-solid text-[#4b4b4b]"
                        : "text-[#7a7a7a] hover:bg-[#f6f6f6]"
                    }`}
                  >
                    <span className="font-medium leading-none text-[14px] tracking-[-0.15px]">{tab}</span>
                  </button>
                );
              })}
              <button
                type="button"
                aria-label="Add dashboard"
                className="flex items-center justify-center rounded-[6px] shrink-0 size-[30px] text-[#4b4b4b] hover:bg-[#f6f6f6] transition-colors duration-150"
              >
                <HugeiconsIcon icon={PlusSignIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-[10px] items-center justify-center shrink-0">
        <button className="border border-[#ededed] border-solid flex gap-[6px] h-[30px] items-center justify-center px-[12px] rounded-[6px] text-[#4b4b4b] hover:bg-[#f9f9f9] transition-colors duration-150">
          <HugeiconsIcon icon={BookOpen01Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">User Guide</span>
        </button>
        <button className="border border-[#ededed] border-solid flex gap-[6px] h-[30px] items-center justify-center px-[12px] rounded-[6px] text-[#4b4b4b] hover:bg-[#f9f9f9] transition-colors duration-150">
          <HugeiconsIcon icon={Refresh01Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">
            {variant === "dashboard" ? "Refresh" : "History"}
          </span>
        </button>
        {variant === "dashboard" && (
          <button className="border border-[#ededed] border-solid flex gap-[6px] h-[30px] items-center justify-center px-[12px] rounded-[6px] text-[#4b4b4b] hover:bg-[#f9f9f9] transition-colors duration-150">
            <HugeiconsIcon icon={ArrowDown05Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            <span className="font-medium leading-none text-[14px] tracking-[-0.15px] whitespace-nowrap">
              Save as Report
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
