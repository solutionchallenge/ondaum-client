const levelThresholds: Record<string, { level: string; min: number }[]> = {
  "PHQ-9": [
    { level: "Minimal", min: 0 },
    { level: "Mild", min: 5 },
    { level: "Moderate", min: 10 },
    { level: "Moderately Severe", min: 15 },
    { level: "Severe", min: 20 },
  ],
  "GAD-7": [
    { level: "Minimal", min: 0 },
    { level: "Mild", min: 5 },
    { level: "Moderate", min: 10 },
    { level: "Severe", min: 15 },
  ],
  PSS: [
    { level: "MildLow Stress", min: 0 },
    { level: "Moderate Stress", min: 14 },
    { level: "High Stress", min: 27 },
  ],
};

export default levelThresholds;
