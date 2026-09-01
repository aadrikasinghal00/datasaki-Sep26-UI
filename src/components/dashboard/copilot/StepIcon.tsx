import Image from "next/image";

export function StepIcon({ size = 13 }: { size?: number }) {
  return (
    <Image
      src="/design-assets/cube-icon.png"
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-[3px]"
    />
  );
}
