"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftDoubleIcon,
  Search01Icon,
  CommandIcon,
  Home02Icon,
  DashboardCircleIcon,
  DatabaseIcon,
  CubeIcon,
  Wrench01Icon,
  PlusSignIcon,
  BellIcon,
  HeadsetIcon,
} from "@hugeicons/core-free-icons";

const STROKE_WIDTH = 1.15;

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home02Icon },
  { id: "dashboard", label: "Dashboard", icon: DashboardCircleIcon },
  { id: "data-sources", label: "Data Sources", icon: DatabaseIcon },
  { id: "ml-models", label: "ML Models", icon: CubeIcon },
  { id: "issue-resolution", label: "Issue Resolution", icon: Wrench01Icon, badge: 2 },
] as const;

const RECENT_CHATS = [
  { id: "chat-1", label: "OEE drop on Line 3 HPLC-04", unread: false },
  { id: "chat-2", label: "Conveyor B stability review", unread: true },
  { id: "chat-3", label: "Weekly downtime summary", unread: false },
  { id: "chat-4", label: "Calibration log check-in", unread: false },
  { id: "chat-5", label: "Shift handover — Aug 29", unread: false },
] as const;

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  activeNav,
  onSelectNav,
  activeChat,
  onSelectChat,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  activeNav: string;
  onSelectNav: (id: string) => void;
  activeChat: string | null;
  onSelectChat: (id: string) => void;
}) {
  return (
    <aside
      className={`bg-[#f6f6f6] border-[#ebebeb] border-r border-solid flex flex-col items-start shrink-0 h-full transition-[width] duration-300 ease-in-out overflow-hidden ${
        collapsed ? "w-[54px]" : "w-[252px]"
      }`}
    >
      {/* Logo row */}
      <div
        className={`flex gap-[8px] h-[54px] items-center shrink-0 w-full ${
          collapsed ? "justify-center px-0" : "pl-[22px] pr-[10px] py-[18px]"
        }`}
      >
        {!collapsed && (
          <div className="flex flex-1 gap-[8px] items-end min-w-0">
            <div className="h-[18.07px] w-[18px] shrink-0">
              <Image src="/design-assets/logo-mark.svg" alt="Datasaki" width={18} height={18} />
            </div>
            <p className="flex-1 min-w-0 font-medium leading-none text-[#2c2c2e] text-[16px] tracking-[-0.15px] whitespace-nowrap overflow-hidden text-ellipsis">
              Datasaki
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex items-center justify-center rounded-md size-[24px] shrink-0 text-[#3b3b3b] hover:bg-[#ebebeb] transition-colors duration-150"
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </span>
        </button>
      </div>

      {/* Nav content */}
      <div
        className={`no-scrollbar flex flex-1 flex-col gap-[24px] items-start min-h-0 py-[8px] w-full overflow-y-auto overflow-x-hidden ${
          collapsed ? "px-[10px]" : "px-[10px]"
        }`}
      >
        {/* Search */}
        {collapsed ? (
          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center h-[32px] rounded-[6px] shrink-0 w-full text-[#626262] hover:bg-[#ebebeb] transition-colors duration-150"
          >
            <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </button>
        ) : (
          <div className="bg-[#f0f0f0] border border-[#ebebeb] border-solid flex gap-[4px] h-[32px] items-center overflow-hidden px-[10px] py-[8px] rounded-[6px] shrink-0 w-full">
            <div className="shrink-0 size-[14px] text-[#626262]">
              <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0 text-[#626262] text-[14px] tracking-[-0.14px]">
              <p className="leading-none font-medium">Search</p>
            </div>
            <div className="flex gap-[4px] items-center shrink-0 text-[#626262]">
              <div className="shrink-0 size-[14px]">
                <HugeiconsIcon icon={CommandIcon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              </div>
              <div className="flex flex-col justify-center shrink-0 text-[14px] tracking-[-0.14px] whitespace-nowrap">
                <p className="leading-none font-medium">K</p>
              </div>
            </div>
          </div>
        )}

        {/* Main nav */}
        <nav className="flex flex-col gap-[4px] items-start shrink-0 w-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectNav(item.id)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center overflow-hidden h-[30px] rounded-[6px] shrink-0 w-full transition-colors duration-150 ${
                  collapsed ? "justify-center" : "gap-[8px] px-[10px]"
                } ${isActive ? "bg-[#e7e7e7]" : "hover:bg-[#ebebeb]"}`}
              >
                <div className="shrink-0 size-[14px] text-[#3b3b3b]">
                  <HugeiconsIcon icon={item.icon} size={14} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
                </div>
                {!collapsed && (
                  <>
                    <p className="flex-1 min-w-0 text-left font-normal leading-none text-[#3b3b3b] text-[14px] tracking-[-0.15px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.label}
                    </p>
                    {"badge" in item && item.badge != null && (
                      <div className="bg-[rgba(119,119,119,0.12)] flex items-center justify-center p-[4px] rounded-[4px] shrink-0 size-[14px]">
                        <span className="font-medium leading-none text-[#777] text-[10px] tracking-[-0.15px]">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Recent */}
        {!collapsed && (
          <div className="flex flex-col gap-[10px] items-start shrink-0 w-full">
            <div className="flex items-center justify-between pl-[12px] pr-[10px] w-full">
              <p className="font-medium leading-none text-[#777] text-[12px] tracking-[-0.15px] whitespace-nowrap">
                Recent
              </p>
              <button
                type="button"
                aria-label="New chat"
                className="bg-white border-[#e5e5e5] border-[0.5px] border-solid flex items-center justify-center rounded-[4px] shrink-0 size-[15px] text-[#3b3b3b] hover:bg-[#f3f3f3] transition-colors duration-150"
              >
                <HugeiconsIcon icon={PlusSignIcon} size={13} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              </button>
            </div>
            <div className="flex flex-col gap-[4px] items-start w-full">
              {RECENT_CHATS.map((chat) => {
                const isActive = activeChat === chat.id;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => onSelectChat(chat.id)}
                    className={`flex gap-[8px] h-[30px] items-center overflow-hidden px-[10px] rounded-[6px] shrink-0 w-full transition-colors duration-150 ${
                      isActive ? "bg-[#e7e7e7]" : "hover:bg-[#ebebeb]"
                    }`}
                  >
                    <p className="flex-1 min-w-0 text-left font-normal leading-none text-[#3b3b3b] text-[14px] tracking-[-0.15px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {chat.label}
                    </p>
                    {chat.unread && (
                      <span className="bg-[#3b82f6] rounded-full shrink-0 size-[6px]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer / profile */}
      {collapsed ? (
        <div className="flex flex-col items-center gap-[8px] shrink-0 w-full py-[16px]">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex items-center justify-center rounded-md shrink-0 size-[24px] text-[#3b3b3b] hover:bg-[#ebebeb] transition-colors duration-150"
          >
            <HugeiconsIcon icon={BellIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            <span className="absolute top-[4px] right-[4px] size-[6px] rounded-full bg-[#f65753] ring-2 ring-[#f6f6f6]" />
          </button>
          <button
            type="button"
            aria-label="Support"
            className="flex items-center justify-center rounded-md shrink-0 size-[24px] text-[#3b3b3b] hover:bg-[#ebebeb] transition-colors duration-150"
          >
            <HugeiconsIcon icon={HeadsetIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
          </button>
          <div className="relative rounded-[4px] shrink-0 size-[20px] overflow-hidden mt-[4px]">
            <Image src="/design-assets/avatar.png" alt="Aadrika Singhal" width={20} height={20} className="object-cover" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between overflow-hidden px-[18px] py-[16px] shrink-0 w-[252px]">
          <div className="flex flex-1 items-center min-w-0 py-[6px] rounded-[6px]">
            <div className="flex gap-[8px] items-center min-w-0">
              <div className="relative rounded-[4px] shrink-0 size-[20px] overflow-hidden">
                <Image src="/design-assets/avatar.png" alt="Aadrika Singhal" width={20} height={20} className="object-cover" />
              </div>
              <p className="font-normal leading-none text-[#3b3b3b] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                Aadrika Singhal
              </p>
            </div>
          </div>
          <div className="flex gap-[4px] items-center shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex items-center justify-center rounded-md shrink-0 size-[24px] text-[#3b3b3b] hover:bg-[#ebebeb] transition-colors duration-150"
            >
              <HugeiconsIcon icon={BellIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
              <span className="absolute top-[4px] right-[4px] size-[6px] rounded-full bg-[#f65753] ring-2 ring-[#f6f6f6]" />
            </button>
            <button
              type="button"
              aria-label="Support"
              className="flex items-center justify-center rounded-md shrink-0 size-[24px] text-[#3b3b3b] hover:bg-[#ebebeb] transition-colors duration-150"
            >
              <HugeiconsIcon icon={HeadsetIcon} size={15} strokeWidth={STROKE_WIDTH} absoluteStrokeWidth />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
