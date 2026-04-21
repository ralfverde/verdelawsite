export type VerdePlusFeature = {
  id: string;
  icon:
    | "Route"
    | "BarChart3"
    | "ScanLine"
    | "Sparkles"
    | "GraduationCap"
    | "MessagesSquare";
  highlights: 3 | number;
};

export const verdePlusFeatures: VerdePlusFeature[] = [
  { id: "caseTracker", icon: "Route", highlights: 3 },
  { id: "judgeStats", icon: "BarChart3", highlights: 3 },
  { id: "documentScanner", icon: "ScanLine", highlights: 3 },
  { id: "aiAssistant", icon: "Sparkles", highlights: 3 },
  { id: "academy", icon: "GraduationCap", highlights: 3 },
  { id: "community", icon: "MessagesSquare", highlights: 3 },
];

export const verdePlusComparisonRows = [
  "caseTrackingRow",
  "judgeStatsRow",
  "scannerRow",
  "aiRow",
  "academyRow",
  "citizenshipPrepRow",
  "communityRow",
  "guidedInterviewRow",
  "documentsRow",
  "messagingRow",
  "paymentsRow",
  "referralsRow",
] as const;
export type ComparisonRowId = (typeof verdePlusComparisonRows)[number];
