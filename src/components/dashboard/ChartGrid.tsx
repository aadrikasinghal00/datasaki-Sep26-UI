const LINE_POSITIONS = [0, 25, 50, 75, 100];

export function ChartGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {LINE_POSITIONS.map((pct) => (
        <div
          key={pct}
          className="absolute left-0 right-0 border-t border-dashed border-[#dbdbdb]"
          style={{ top: `${pct}%` }}
        />
      ))}
    </div>
  );
}
