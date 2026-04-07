import type { DailyActivities, DailyRecord } from '../types';

type Props = {
  date: string;
  activities: DailyActivities;
  dayXp: number;
  isEditing: boolean;
  onDateChange: (date: string) => void;
  onToggle: (key: keyof DailyActivities) => void;
  onSave: () => void;
};

const activityLabels: Record<keyof DailyActivities, string> = {
  musculacao: 'Musculação',
  corrida: 'Corrida',
  execucao: 'Execução',
  social: 'Social'
};

export function DailyForm({ date, activities, dayXp, isEditing, onDateChange, onToggle, onSave }: Props) {
  return (
    <section className="card">
      <h2>Registro diário</h2>
      <div className="field">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" value={date} onChange={(e) => onDateChange(e.target.value)} required />
      </div>

      <div className="check-grid">
        {(Object.keys(activityLabels) as Array<keyof DailyActivities>).map((key) => (
          <label key={key} className="checkbox-row">
            <input type="checkbox" checked={activities[key]} onChange={() => onToggle(key)} />
            {activityLabels[key]}
          </label>
        ))}
      </div>

      <p className="xp-preview">XP do dia: <strong>{dayXp}</strong></p>
      <button onClick={onSave}>{isEditing ? 'Atualizar registro' : 'Salvar registro'}</button>
    </section>
  );
}

export function formatActivities(record: DailyRecord): string {
  const labels: string[] = [];
  if (record.activities.musculacao) labels.push('Musculação');
  if (record.activities.corrida) labels.push('Corrida');
  if (record.activities.execucao) labels.push('Execução');
  if (record.activities.social) labels.push('Social');
  return labels.length > 0 ? labels.join(', ') : 'Nenhuma atividade';
}
