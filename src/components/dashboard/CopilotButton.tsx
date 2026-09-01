import { CopilotIcon } from "./copilot/CopilotIcon";

export function CopilotButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#202020] flex gap-[6px] items-center justify-center overflow-hidden px-[12px] h-[30px] rounded-[6px] shadow-[0px_2px_2.9px_0px_rgba(230,230,230,0.25)] hover:bg-[#2c2c2c] transition-colors duration-150"
    >
      <CopilotIcon size={15} radius={4} dark />
      <span className="font-medium leading-none text-[14px] text-white tracking-[-0.15px] whitespace-nowrap">
        Ask Co-Pilot
      </span>
    </button>
  );
}
