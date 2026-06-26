"use client";

import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

type CronField = "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek";

const fieldLabels: Record<CronField, string> = {
  minute: "Minute",
  hour: "Hour",
  dayOfMonth: "Day of Month",
  month: "Month",
  dayOfWeek: "Day of Week",
};

const fieldPresets: Record<CronField, { label: string; value: string }[]> = {
  minute: [
    { label: "Every minute", value: "*" },
    { label: "At 0", value: "0" },
    { label: "At 15", value: "15" },
    { label: "At 30", value: "30" },
    { label: "At 45", value: "45" },
    { label: "Every 5 min", value: "*/5" },
    { label: "Every 10 min", value: "*/10" },
    { label: "Every 15 min", value: "*/15" },
    { label: "Every 30 min", value: "*/30" },
  ],
  hour: [
    { label: "Every hour", value: "*" },
    { label: "At 0 (midnight)", value: "0" },
    { label: "At 6", value: "6" },
    { label: "At 8", value: "8" },
    { label: "At 12", value: "12" },
    { label: "At 18", value: "18" },
    { label: "At 20", value: "20" },
    { label: "At 23", value: "23" },
    { label: "Every 2 hours", value: "*/2" },
    { label: "Every 6 hours", value: "*/6" },
    { label: "Every 12 hours", value: "*/12" },
  ],
  dayOfMonth: [
    { label: "Every day", value: "*" },
    { label: "1st", value: "1" },
    { label: "15th", value: "15" },
    { label: "28th", value: "28" },
    { label: "30th", value: "30" },
    { label: "Last day", value: "L" },
  ],
  month: [
    { label: "Every month", value: "*" },
    { label: "Jan", value: "1" },
    { label: "Mar", value: "3" },
    { label: "Jun", value: "6" },
    { label: "Sep", value: "9" },
    { label: "Dec", value: "12" },
  ],
  dayOfWeek: [
    { label: "Every day", value: "*" },
    { label: "Sun", value: "0" },
    { label: "Mon", value: "1" },
    { label: "Tue", value: "2" },
    { label: "Wed", value: "3" },
    { label: "Thu", value: "4" },
    { label: "Fri", value: "5" },
    { label: "Sat", value: "6" },
  ],
};

export default function CronBuilder() {
  // [STATE]: Each field's value (cron part)
  const [fields, setFields] = useState<Record<CronField, string>>({
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  });

  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  // [CALC]: Compose the full cron expression
  const cronExpression = useMemo(() => {
    return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
  }, [fields]);

  // [CALC]: Human‑readable description
  const description = useMemo(() => {
    const expr = cronExpression;
    const map: Record<string, string> = {
      "* * * * *": "Runs every minute",
      "0 * * * *": "Runs every hour",
      "0 0 * * *": "Runs every day at midnight",
      "0 8 * * 1": "Runs every Monday at 8:00 AM",
      "0 0 1 * *": "Runs on the 1st of every month",
    };
    return map[expr] || "Custom schedule";
  }, [cronExpression]);

  // [HANDLER]: Update a specific field
  const updateField = (field: CronField, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  // [HANDLER]: Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col space-y-4 h-full overflow-y-auto scrollbar-none">
        <span className="text-sm font-medium text-(--color-muted) block mb-0.5">
          Cron-Job Expression Builder
        </span>

        {Object.keys(fieldLabels).map((key) => {
          const field = key as CronField;
          return (
            <div
              key={field}
              className="grid grid-cols-[100px_1fr] items-center gap-3"
            >
              <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
                {fieldLabels[field]}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={fields[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-16 min-w-0 px-2 py-1.5 text-sm font-mono bg-(--color-bg) border border-(--color-border) rounded-md focus:outline-none focus:ring-1 focus:ring-(--color-accent) text-(--color-text)"
                  placeholder="*"
                />
                <select
                  value={fields[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="fles-1 px-2 py-1.5 text-sm font-mono bg-(--color-bg) border border-(--color-border) rounded-md focus:outline-none focus:ring-1 focus:ring-(--color-accent) text-(--color-text) cursor-pointer"
                >
                  {fieldPresets[field].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column – Output */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
            Preview
          </span>
        </div>

        <div className="flex-1 min-h-0 relative">
          <pre className="w-full h-full font-mono text-(--color-text) whitespace-pre-wrap break-all bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden pr-16 flex flex-col">
            <span className="text-lg font-bold tracking-wide">
              {cronExpression}
            </span>
            <span className="text-xs text-(--color-muted) mt-2">
              # {description}
            </span>
          </pre>

          <button
            onClick={handleCopy}
            className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-(--color-elevated) border border-(--color-border) text-(--color-text) rounded-md text-xs font-medium hover:text-(--color-accent) transition-colors shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copyStatus}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
