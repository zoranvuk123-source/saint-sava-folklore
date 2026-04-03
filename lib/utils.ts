import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(name: string): string {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);

  // Fallback for non-Latin names or empty results
  if (!slug || slug.length < 3) {
    slug = `showroom-${Date.now().toString(36)}`;
  }

  return slug;
}

export function sanitizeInput(input: string, maxLength = 1000): string {
  return input
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]{3,50}$/.test(slug);
}
