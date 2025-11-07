export type GoalPeriod = "Daily" | "Weekly" | "Monthly";

export interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  period: GoalPeriod;
}

export interface CompletedGoal {
  id: string;
  title: string;
  completedDate: string;
  category:
    | "Mental wellness"
    | "Social connection"
    | "Lifestyle & Habits"
    | "Personal Growth";
  duration: "7" | "14" | "30";
  trackingMethod: "Daily Check-ins" | "Weekly Milestone" | "One-time Goal";
}
