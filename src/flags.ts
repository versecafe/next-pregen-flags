import { unstable_flag as flag } from "@vercel/flags/next";

export const colorFlag = flag<"green" | "blue" | "red">({
  key: "color",
  /** Logic for selecting the flag, you can access data passed
   * in by middleware through unstable_getPrecomputationContext
   * const context = unstable_getPrecomputationContext() */
  async decide() {
    /* Synthetic flag selection */
    return Math.random() < 0.33
      ? "blue"
      : Math.random() < 0.5
        ? "green"
        : "red";
  },
  description: "Color options.",
  defaultValue: "green",
  options: [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
  ],
});

export const showFooterFlag = flag<boolean>({
  key: "showFooter",
  /** Logic for selecting the flag, you can access data passed
   * in by middleware through unstable_getPrecomputationContext
   * const context = unstable_getPrecomputationContext() */
  async decide() {
    /* Synthetic flag selection, footer 80% of the time */
    return Math.random() < 0.8 ? true : false;
  },
  description: "Show footer.",
  defaultValue: true,
  options: [
    { value: true, label: "Show" },
    { value: false, label: "Hide" },
  ],
});

export const precomputedFlags = [colorFlag, showFooterFlag] as const;

export interface FlagProps {
  params: {
    code: string;
  };
}

export const flagKeys: string[] = precomputedFlags.map((flag) => flag.key);
