import type { DailyActivities, DailyRecord } from '../types';

type Props = {
  date: string;
  activities: DailyActivities;
  dayXp: number;
  isEditing: boolean;
  saveMessage: string | null;
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

export function DailyForm({ date, activities, dayXp, isEditing, saveMessage, onDateChange, onToggle, onSave }: Props) {
  const hasPenalty = !activities.musculacao && !activities.corrida;

  return (
    <section className="card daily-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Entrada rápida</p>
          <h2>Registro diário</h2>
        </div>
        {isEditing && <span className="badge badge-editing">Editando</span>}
      </div>

      {saveMessage && (
        <p className="feedback success" role="status">
          {saveMessage}
        </p>
      )}

      <div className="field">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" value={date} onChange={(e) => onDateChange(e.target.value)} required />
      </div>

      <div className="form-block">
        <div>
          <h3>Atividades do dia</h3>
          <p className="muted">Marque apenas o que foi concluído nesta data.</p>
        </div>
        <div className="check-grid">
          {(Object.keys(activityLabels) as Array<keyof DailyActivities>).map((key) => (
            <label key={key} className={`checkbox-row ${activities[key] ? 'checked' : ''}`}>
              <input type="checkbox" checked={activities[key]} onChange={() => onToggle(key)} />
              <span>{activityLabels[key]}</span>
            </label>
          ))}
        </div>
      </div>

      <p className={`xp-preview ${hasPenalty ? 'penalty' : ''}`}>
        <span>XP do dia</span>
        <strong>{dayXp}</strong>
        {hasPenalty && <small>Penalidade aplicada: sem atividade física.</small>}
      </p>
      <button className="primary-action" onClick={onSave}>{isEditing ? 'Atualizar registro' : 'Salvar registro'}</button>
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
