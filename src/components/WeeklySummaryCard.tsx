import type { WeeklySummary } from '../types';

type Props = {
  summary: WeeklySummary;
};

export function WeeklySummaryCard({ summary }: Props) {
  return (
    <section className="card weekly-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Semana atual</p>
          <h2>Resumo semanal</h2>
        </div>
        {summary.penaltiesApplied > 0 && <span className="badge badge-warning">{summary.penaltiesApplied} penalidade(s)</span>}
      </div>
      <div className="week-xp">
        <span>XP da semana</span>
        <strong>{summary.weekXp}</strong>
      </div>
      <ul className="stats">
        <li>Musculação <strong>{summary.musculacaoDays}</strong></li>
        <li>Corrida <strong>{summary.corridaDays}</strong></li>
        <li>Execução <strong>{summary.execucaoDays}</strong></li>
        <li>Social <strong>{summary.socialDays}</strong></li>
        <li className={summary.penaltiesApplied > 0 ? 'danger-text' : ''}>Penalidades <strong>{summary.penaltiesApplied}</strong></li>
      </ul>
    </section>
  );
}
