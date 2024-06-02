import { type Flag, unstable_flag as flag } from "@vercel/flags/next";

export const colorFlag = flag<"r" | "g" | "b">({
  key: "color",
  /** Logic for selecting the flag, you can access data passed
   * in by middleware through unstable_getPrecomputationContext
   * const context = unstable_getPrecomputationContext() */
  async decide() {
    return Math.random() < 0.33 ? "r" : Math.random() < 0.5 ? "g" : "b";
  },
  description: "Color options",
  defaultValue: "g",
  options: [
    { value: "r", label: "Red" },
    { value: "g", label: "Green" },
    { value: "b", label: "Blue" },
  ],
});

export const showFooterFlag = flag<boolean>({
  key: "footer",
  /** Logic for selecting the flag, you can access data passed
   * in by middleware through unstable_getPrecomputationContext
   * const context = unstable_getPrecomputationContext() */
  async decide() {
    /* Synthetic flag selection, footer 80% of the time */
    return Math.random() < 0.8 ? true : false;
  },
  description: "Footer",
  defaultValue: true,
  options: [
    { value: true, label: "Show" },
    { value: false, label: "Hide" },
  ],
});

export const precomputedFlags: readonly Flag<any>[] = [
  colorFlag,
  showFooterFlag,
] as const;

export interface FlagProps {
  params: {
    code: string;
  };
}

export const flagKeys: string[] = precomputedFlags.map((flag) => flag.key);
