import Image from "next/image";

export function CopilotIcon({
  size = 20,
  radius,
  dark = false,
}: {
  size?: number;
  radius?: number;
  /** Use the native dark-background export — only for placement on a dark surface
   *  (e.g. the "Ask Co-Pilot" button), where it's shown at ~native resolution. */
  dark?: boolean;
}) {
  if (dark) {
    return (
      <div
        className="relative shrink-0 overflow-hidden bg-[#202020]"
        style={{ width: size, height: size, borderRadius: radius ?? Math.max(4, Math.round(size * 0.28)) }}
      >
        <Image src="/design-assets/copilot-icon.png" alt="" fill unoptimized className="object-cover" />
      </div>
    );
  }

  return (
    <Image
      src="/design-assets/cube-icon.png"
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0"
      style={{ borderRadius: radius ?? Math.max(4, Math.round(size * 0.28)) }}
    />
  );
}
