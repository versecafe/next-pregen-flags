import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combine class names for tailwindcss */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
