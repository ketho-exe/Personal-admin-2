export type ThemeMode = "light" | "dark";
export type QuickCaptureKind = "Task" | "Reminder" | "Note";

export function getNextTheme(theme: ThemeMode): ThemeMode {
  return theme === "light" ? "dark" : "light";
}

export function createQuickCaptureMessage(kind: QuickCaptureKind, value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return `Type something to capture a ${kind.toLowerCase()}.`;
  }

  return `${kind} captured: "${trimmed}"`;
}
