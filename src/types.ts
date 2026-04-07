export type DailyActivities = {
  musculacao: boolean;
  corrida: boolean;
  execucao: boolean;
  social: boolean;
};

export type DailyRecord = {
  date: string; // YYYY-MM-DD
  activities: DailyActivities;
  xp: number;
};

export type WeeklySummary = {
  weekXp: number;
  musculacaoDays: number;
  corridaDays: number;
  execucaoDays: number;
  socialDays: number;
  penaltiesApplied: number;
};

export type LevelInfo = {
  level: number;
  totalXp: number;
  currentLevelMinXp: number;
  nextLevelMinXp: number | null;
  xpToNextLevel: number;
  progressPercent: number;
};
