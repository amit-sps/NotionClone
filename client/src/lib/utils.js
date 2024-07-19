import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertDateToNumber(value) {
  const date = new Date(value);
  return date.getTime();
}