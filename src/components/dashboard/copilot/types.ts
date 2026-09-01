export type WidgetData = {
  title: string;
  unit?: string;
  bars: { label: string; value: number }[];
  line?: { label: string; value: number }[];
  annotateIndex?: number;
};

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | {
      id: string;
      role: "assistant";
      status: "thinking" | "done";
      steps?: number;
      text?: string;
      widget?: WidgetData;
    };
