import type { DailyActivities, DailyRecord, LevelInfo, WeeklySummary } from '../types';

export const XP_VALUES = {
  musculacao: 20,
  corrida: 25,
  execucao: 25,
  social: 10,
  noPhysicalPenalty: -20
} as const;

export const LEVELS = [
  { level: 1, minXp: 0 },
  { level: 2, minXp: 100 },
  { level: 3, minXp: 250 },
  { level: 4, minXp: 450 },
  { level: 5, minXp: 700 },
  { level: 6, minXp: 1000 }
] as const;

export function calculateDailyXp(activities: DailyActivities): number {
  let xp = 0;
  if (activities.musculacao) xp += XP_VALUES.musculacao;
  if (activities.corrida) xp += XP_VALUES.corrida;
  if (activities.execucao) xp += XP_VALUES.execucao;
  if (activities.social) xp += XP_VALUES.social;

  if (!activities.musculacao && !activities.corrida) {
    xp += XP_VALUES.noPhysicalPenalty;
  }

  return xp;
}

export function calculateTotalXp(records: DailyRecord[]): number {
  return records.reduce((acc, record) => acc + record.xp, 0);
}

export function getLevelInfo(totalXp: number): LevelInfo {
  const sortedLevels = [...LEVELS].sort((a, b) => a.minXp - b.minXp);
  let current = sortedLevels[0];
  let next: (typeof sortedLevels)[number] | null = null;

  for (let i = 0; i < sortedLevels.length; i += 1) {
    const level = sortedLevels[i];
    if (totalXp >= level.minXp) {
      current = level;
      next = sortedLevels[i + 1] ?? null;
    }
  }

  if (!next) {
    return {
      level: current.level,
      totalXp,
      currentLevelMinXp: current.minXp,
      nextLevelMinXp: null,
      xpToNextLevel: 0,
      progressPercent: 100
    };
  }

  const range = next.minXp - current.minXp;
  const progressed = totalXp - current.minXp;

  return {
    level: current.level,
    totalXp,
    currentLevelMinXp: current.minXp,
    nextLevelMinXp: next.minXp,
    xpToNextLevel: Math.max(0, next.minXp - totalXp),
    progressPercent: Math.min(100, Math.round((progressed / range) * 100))
  };
}

function getStartOfWeek(date: Date): Date {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getEndOfWeek(date: Date): Date {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function calculateWeeklySummary(records: DailyRecord[], referenceDate = new Date()): WeeklySummary {
  const start = getStartOfWeek(referenceDate);
  const end = getEndOfWeek(referenceDate);

  const weekRecords = records.filter((record) => {
    const d = new Date(`${record.date}T00:00:00`);
    return d >= start && d <= end;
  });

  return weekRecords.reduce<WeeklySummary>(
    (summary, record) => {
      const hasPenalty = !record.activities.musculacao && !record.activities.corrida;
      return {
        weekXp: summary.weekXp + record.xp,
        musculacaoDays: summary.musculacaoDays + (record.activities.musculacao ? 1 : 0),
        corridaDays: summary.corridaDays + (record.activities.corrida ? 1 : 0),
        execucaoDays: summary.execucaoDays + (record.activities.execucao ? 1 : 0),
        socialDays: summary.socialDays + (record.activities.social ? 1 : 0),
        penaltiesApplied: summary.penaltiesApplied + (hasPenalty ? 1 : 0)
      };
    },
    {
      weekXp: 0,
      musculacaoDays: 0,
      corridaDays: 0,
      execucaoDays: 0,
      socialDays: 0,
      penaltiesApplied: 0
    }
  );
}
