import type { DailyRecord } from '../types';
import { formatActivities } from './DailyForm';

type Props = {
  records: DailyRecord[];
  onEdit: (date: string) => void;
  onDelete: (date: string) => void;
  editingDate: string | null;
};

export function HistoryList({ records, onEdit, onDelete, editingDate }: Props) {
  return (
    <section className="card history-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Registros</p>
          <h2>Histórico</h2>
        </div>
        <span className="badge">{records.length} dia(s)</span>
      </div>
      {records.length === 0 ? (
        <p className="muted">Sem registros ainda.</p>
      ) : (
        <ul className="history-list">
          {records.map((record) => (
            <li key={record.date} className={editingDate === record.date ? 'editing-row' : ''}>
              <div className="history-content">
                {editingDate === record.date && <span className="badge badge-editing">Em edição</span>}
                <div className="history-main">
                  <div>
                    <span className="history-label">Data</span>
                    <strong className="history-date">{record.date}</strong>
                  </div>
                </div>
                <p className="history-activities">{formatActivities(record)}</p>
                <small className={`history-xp ${record.xp < 0 ? 'danger-text' : ''}`}>XP final: <strong>{record.xp}</strong></small>
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
