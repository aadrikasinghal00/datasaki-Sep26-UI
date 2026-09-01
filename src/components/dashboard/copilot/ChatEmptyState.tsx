import { CopilotIcon } from "./CopilotIcon";

const SUGGESTIONS = [
  "What's the biggest production risk right now?",
  "Which machine is dragging fleet OEE down today?",
  "Why did downtime spike in the last shift?",
];

export function ChatEmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[32px] px-[16px] py-[24px]">
      <div className="flex flex-col items-center gap-[16px]">
        <CopilotIcon size={40} radius={10} />
        <div className="flex flex-col items-center gap-[8px] text-center">
          <div className="flex items-center gap-[8px]">
            <p className="font-medium text-[16px] text-[#2c2c2e] tracking-[-0.15px]">Datasaki Copilot</p>
            <span className="bg-[rgba(166,72,254,0.1)] text-[#a648fe] text-[10px] font-medium px-[8px] py-[2px] rounded-full">
              Beta
            </span>
          </div>
          <p className="text-[13px] text-[#8f8f8f] leading-[18px]">Ask me any question about this data.</p>
        </div>
      </div>

      <div className="flex flex-col gap-[8px] w-full">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            type="button"
            onClick={() => onPick(text)}
            className="w-full text-left px-[12px] py-[10px] rounded-[8px] border border-[#ebebeb] hover:bg-[#f6f6f6] hover:border-[#dedede] transition-colors duration-150"
          >
            <span className="text-[13px] leading-[18px] text-[#3b3b3b] font-normal">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
