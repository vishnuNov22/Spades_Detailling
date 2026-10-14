export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
