export const resultPolarityMap: Record<
  string,
  Record<string, "positive" | "negative">
> = {
  "PHQ-9": {
    Minimal: "positive",
    Mild: "positive",
    Moderate: "negative",
    "Moderately Severe": "negative",
    Severe: "negative",
  },
  "GAD-7": {
    Minimal: "positive",
    Mild: "positive",
    Moderate: "negative",
    Severe: "negative",
  },
  PSS: {
    "MildLow Stress": "positive",
    "Moderate Stress": "negative",
    "High Stress": "negative",
  },
};
