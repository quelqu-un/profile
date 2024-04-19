import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';  // Adjust the import to named import

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
