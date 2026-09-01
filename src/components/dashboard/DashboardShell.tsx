"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { FilterBar } from "./FilterBar";
import { StatCard, type StatCardData } from "./StatCard";
import { BarChartCard } from "./BarChartCard";
import { HeatmapCard } from "./HeatmapCard";
import { LineChartCard } from "./LineChartCard";
import { CopilotButton } from "./CopilotButton";
import { CopilotPanel } from "./copilot/CopilotPanel";
import { ChatConversationView } from "./copilot/ChatConversationView";
import { HomePage } from "./HomePage";

const STATS: StatCardData[] = [
  { label: "Number Of Stability Samples", value: "43", trend: "13.8%", trendDirection: "up", period: "1 Week" },
  { label: "Stability Samples Handled", value: "225", trend: "13.8%", trendDirection: "up", period: "1 Week" },
  { label: "Sample Count", value: "59", trend: "13.8%", trendDirection: "down", period: "1 Week" },
  { label: "Pulled On", value: "21864", trend: "13.8%", trendDirection: "up", period: "1 Week" },
];

const BAR_DATA = [
  { label: "INS-HPLC-01", value: 123 },
  { label: "INS-HPLC-02", value: 172 },
];

const LINE_DATA = [
  { label: "Aug 9", value: 155 },
  { label: "Aug 13", value: 70 },
  { label: "Aug 17", value: 48 },
  { label: "Aug 21", value: 122 },
  { label: "Aug 25", value: 108 },
  { label: "Aug 29", value: 65 },
];

type View = "dashboard" | "home" | "chat";

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedBeforePanel, setCollapsedBeforePanel] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard 1");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  function selectNav(id: string) {
    setActiveNav(id);
    setView(id === "home" ? "home" : "dashboard");
  }

  function startFullPageChat(text: string) {
    setChatInitialMessage(text);
    setView("chat");
  }

  function openPanel() {
    setCollapsedBeforePanel(collapsed);
    setCollapsed(true);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setCollapsed(collapsedBeforePanel);
  }

  return (
    <div className="flex h-full w-full bg-[#fafafa] overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        activeNav={activeNav}
        onSelectNav={selectNav}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
      />

      <div key={view} className="view-fade-in relative flex flex-1 flex-col min-w-0 h-full">
        {view === "chat" ? (
          <ChatConversationView key={chatInitialMessage ?? "empty"} initialMessage={chatInitialMessage} />
        ) : view === "home" ? (
          <>
            <div className="shrink-0 border-b border-[#ebebeb] bg-[#fafafa]">
              <TopBar variant="home" activeTab={activeTab} onSelectTab={setActiveTab} />
            </div>
            <div className="flex-1 min-h-0 bg-[#fafafa]">
              <HomePage onAsk={startFullPageChat} />
            </div>
          </>
        ) : (
          <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto bg-[#fafafa]">
            <div className="sticky top-0 z-20 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#ebebeb]/70">
              <TopBar variant="dashboard" activeTab={activeTab} onSelectTab={setActiveTab} />
            </div>

            <FilterBar />

            <div className="flex flex-col gap-[16px] px-[16px] pb-[24px]">
              <div className="grid grid-cols-4 gap-[16px] h-[127px]">
                {STATS.map((stat, i) => (
                  <StatCard key={i} {...stat} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-[16px] h-[306px]">
                <BarChartCard title="Sample by Instrument" bars={BAR_DATA} />
                <HeatmapCard title="Instrument timepoint heatmap" />
              </div>

              <div className="grid grid-cols-2 gap-[16px] h-[306px]">
                <BarChartCard title="Sample by Instrument" bars={BAR_DATA} />
                <LineChartCard title="Sample by Instrument" points={LINE_DATA} />
              </div>

              <div className="grid grid-cols-2 gap-[16px] h-[306px]">
                <BarChartCard title="Sample by Instrument" bars={BAR_DATA} />
                <LineChartCard title="Sample by Instrument" points={LINE_DATA} />
              </div>
            </div>
          </div>
        )}

        {view === "dashboard" && !panelOpen && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[20px] flex justify-center">
            <div className="pointer-events-auto">
              <CopilotButton onClick={openPanel} />
            </div>
          </div>
        )}
      </div>

      {view === "dashboard" && <CopilotPanel open={panelOpen} onClose={closePanel} />}
    </div>
  );
}
