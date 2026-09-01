import Image from "next/image";
import { ChartCardHeader } from "./ChartCardHeader";

const ROWS = [
  { label: "INS-HPLC-01", color: "#02b7db" },
  { label: "INS-HPLC-02", color: "#02b7db" },
  { label: "INS-HPLC-03", color: "#02b7db" },
  { label: "INS-HPLC-04", color: "#02b7db" },
  { label: "INS-HPLC-05", color: "#02b7db" },
  { label: "INS-HPLC-06", color: "#48c08f" },
  { label: "INS-HPLC-07", color: "#48c08f" },
  { label: "INS-HPLC-08", color: "#48c08f" },
] as const;

export function HeatmapCard({ title }: { title: string }) {
  return (
    <div className="bg-white border border-[#ebebeb] border-solid flex flex-col gap-[23px] items-start overflow-hidden p-[14px] relative rounded-[7px] size-full">
      <ChartCardHeader title={title} />
      <div className="flex flex-1 flex-col gap-[8px] items-start min-h-0 px-[2px] w-full">
        {ROWS.map((row) => (
          <div key={row.label} className="flex gap-[8px] items-center w-full">
            <p className="flex-1 min-w-0 font-medium leading-none text-[#8f8f8f] text-[12px]">
              {row.label}
            </p>
            <div className="border border-[#ededed] border-solid flex flex-1 h-[24px] items-center justify-center min-w-0 px-[10px] rounded-[6px]">
              <span className="font-medium leading-none text-[#424355] text-[12px] text-center whitespace-nowrap">
                -
              </span>
            </div>
            <div
              className="flex flex-1 h-[24px] items-center justify-center min-w-0 px-[10px] rounded-[6px] transition-colors duration-300"
              style={{ backgroundColor: row.color }}
            >
              <span className="font-medium leading-none text-[12px] text-center text-white whitespace-nowrap">
                -
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[-1px] h-[14px] left-[-1px] w-[calc(100%+2px)] pointer-events-none">
        <Image src="/design-assets/heatmap-fade.png" alt="" fill className="object-fill" />
      </div>
    </div>
  );
}
