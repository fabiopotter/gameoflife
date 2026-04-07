import type { WeeklySummary } from '../types';

type Props = {
  summary: WeeklySummary;
};

export function WeeklySummaryCard({ summary }: Props) {
  return (
    <section className="card">
      <h2>Resumo semanal</h2>
      <ul className="stats">
        <li>XP da semana: <strong>{summary.weekXp}</strong></li>
        <li>Dias com musculação: <strong>{summary.musculacaoDays}</strong></li>
        <li>Dias com corrida: <strong>{summary.corridaDays}</strong></li>
        <li>Dias com execução: <strong>{summary.execucaoDays}</strong></li>
        <li>Dias com social: <strong>{summary.socialDays}</strong></li>
        <li>Penalidades: <strong>{summary.penaltiesApplied}</strong></li>
      </ul>
    </section>
  );
}
