import type { DailyRecord } from '../types';
import { formatActivities } from './DailyForm';

type Props = {
  records: DailyRecord[];
  onEdit: (date: string) => void;
  onDelete: (date: string) => void;
};

export function HistoryList({ records, onEdit, onDelete }: Props) {
  return (
    <section className="card">
      <h2>Histórico</h2>
      {records.length === 0 ? (
        <p className="muted">Sem registros ainda.</p>
      ) : (
        <ul className="history-list">
          {records.map((record) => (
            <li key={record.date}>
              <div>
                <strong>{record.date}</strong>
                <p>{formatActivities(record)}</p>
                <small>XP final: {record.xp}</small>
              </div>
              <div className="actions">
                <button onClick={() => onEdit(record.date)} className="secondary">Editar</button>
                <button onClick={() => onDelete(record.date)} className="danger">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
