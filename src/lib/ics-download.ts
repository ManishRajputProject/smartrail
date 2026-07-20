import { createEvent, type EventAttributes } from "ics";

export function downloadReminderIcs({
  title,
  description,
  start,
  durationMinutes = 30,
}: {
  title: string;
  description: string;
  start: Date;
  durationMinutes?: number;
}) {
  const attributes: EventAttributes = {
    title,
    description,
    start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
    duration: { minutes: durationMinutes },
    startInputType: "local",
  };

  createEvent(attributes, (error, value) => {
    if (error || !value) {
      console.error("Failed to generate calendar file", error);
      return;
    }
    const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}
