import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeAgo = (date: any) =>
  formatDistanceToNowStrict(parseISO(date), { addSuffix: true });
