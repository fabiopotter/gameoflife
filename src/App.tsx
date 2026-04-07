import { useMemo, useState } from 'react';
import './styles.css';
import { DailyForm } from './components/DailyForm';
import { HistoryList } from './components/HistoryList';
import { ProgressCard } from './components/ProgressCard';
import { WeeklySummaryCard } from './components/WeeklySummaryCard';
import { calculateDailyXp, calculateTotalXp, calculateWeeklySummary, getLevelInfo } from './domain/xp';
import { loadRecords, saveRecords } from './storage/records';
import type { DailyActivities, DailyRecord } from './types';

const emptyActivities: DailyActivities = {
  musculacao: false,
  corrida: false,
  execucao: false,
  social: false
};

const today = new Date().toISOString().slice(0, 10);

export default function App() {
  const [records, setRecords] = useState<DailyRecord[]>(() => loadRecords());
  const [date, setDate] = useState(today);
  const [activities, setActivities] = useState<DailyActivities>(emptyActivities);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const dayXp = useMemo(() => calculateDailyXp(activities), [activities]);
  const totalXp = useMemo(() => calculateTotalXp(records), [records]);
  const weeklySummary = useMemo(() => calculateWeeklySummary(records), [records]);
  const levelInfo = useMemo(() => getLevelInfo(totalXp), [totalXp]);

  const upsertRecord = (newRecord: DailyRecord) => {
    setRecords((prev) => {
      const withoutDate = prev.filter((record) => record.date !== newRecord.date);
      const next = [newRecord, ...withoutDate].sort((a, b) => b.date.localeCompare(a.date));
      saveRecords(next);
      return next;
    });
  };

  const onDateChange = (newDate: string) => {
    setDate(newDate);
    setSaveMessage(null);
    const found = records.find((record) => record.date === newDate);
    if (found) {
      setActivities(found.activities);
      setEditingDate(found.date);
      return;
    }

    setActivities(emptyActivities);
    setEditingDate(null);
  };

  const onToggle = (key: keyof DailyActivities) => {
    setSaveMessage(null);
    setActivities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSave = () => {
    if (!date) {
      alert('Data é obrigatória.');
      return;
    }

    const exists = records.some((record) => record.date === date);
    if (exists && editingDate !== date) {
      alert('Este dia já existe. Entre em modo de edição carregando a mesma data.');
      return;
    }

    const record: DailyRecord = {
      date,
      activities,
      xp: calculateDailyXp(activities)
    };

    upsertRecord(record);
    setSaveMessage(editingDate === date ? 'Registro atualizado com sucesso.' : 'Registro salvo com sucesso.');
    setEditingDate(date);
  };

  const onEdit = (targetDate: string) => {
    const record = records.find((r) => r.date === targetDate);
    if (!record) return;
    setDate(record.date);
    setActivities(record.activities);
    setEditingDate(record.date);
    setSaveMessage(null);
  };

  const onDelete = (targetDate: string) => {
    setRecords((prev) => {
      const next = prev.filter((record) => record.date !== targetDate);
      saveRecords(next);
      return next;
    });

    if (editingDate === targetDate) {
      setEditingDate(null);
      setActivities(emptyActivities);
      setSaveMessage(null);
    }
  };

  return (
    <main className="container">
      <header className="app-header">
        <div>
          <p className="eyebrow">Painel diário</p>
          <h1>Rotina XP</h1>
          <p className="subtitle">Registro rápido para acompanhar consistência, progresso e semana atual.</p>
        </div>
        <div className="header-stat">
          <span>XP total</span>
          <strong>{totalXp}</strong>
        </div>
      </header>

      <section className="dashboard-grid" aria-label="Resumo da rotina">
        <DailyForm
          date={date}
          activities={activities}
          dayXp={dayXp}
          isEditing={editingDate === date}
          saveMessage={saveMessage}
          onDateChange={onDateChange}
          onToggle={onToggle}
          onSave={onSave}
        />
        <div className="side-panel">
          <ProgressCard levelInfo={levelInfo} />
          <WeeklySummaryCard summary={weeklySummary} />
        </div>
      </section>
      <HistoryList records={records} onEdit={onEdit} onDelete={onDelete} editingDate={editingDate} />
    </main>
  );
}
