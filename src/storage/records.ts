import type { DailyRecord } from '../types';

const STORAGE_KEY = 'routine_xp_records_v1';

function isValidRecord(record: unknown): record is DailyRecord {
  if (typeof record !== 'object' || record === null) return false;
  const candidate = record as DailyRecord;
  return (
    typeof candidate.date === 'string' &&
    typeof candidate.xp === 'number' &&
    typeof candidate.activities === 'object' &&
    candidate.activities !== null &&
    typeof candidate.activities.musculacao === 'boolean' &&
    typeof candidate.activities.corrida === 'boolean' &&
    typeof candidate.activities.execucao === 'boolean' &&
    typeof candidate.activities.social === 'boolean'
  );
}

export function loadRecords(): DailyRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(isValidRecord);
    return valid.sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}

export function saveRecords(records: DailyRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
