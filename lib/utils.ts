import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatShortDate(value?: string) {
  if (!value) return "No date";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short"
  }).format(new Date(`${value}T00:00:00Z`));
}
