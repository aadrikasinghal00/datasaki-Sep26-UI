export function ThinkingText({ text = "Finding the problem…" }: { text?: string }) {
  return (
    <span className="shimmer-text font-medium text-[14px] leading-[20px]" aria-live="polite">
      {text}
    </span>
  );
}
