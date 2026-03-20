/**
 * Lightweight className merger — joins truthy strings and filters empty values.
 * Drop-in replacement for `clsx` or `cn` without adding a dependency.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
