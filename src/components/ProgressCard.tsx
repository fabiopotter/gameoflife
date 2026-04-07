import type { LevelInfo } from '../types';

type Props = {
  levelInfo: LevelInfo;
};

export function ProgressCard({ levelInfo }: Props) {
  return (
    <section className="card">
      <h2>Progressão</h2>
      <p>XP acumulado: <strong>{levelInfo.totalXp}</strong></p>
      <p>Nível atual: <strong>{levelInfo.level}</strong></p>
      <p>Falta para próximo nível: <strong>{levelInfo.xpToNextLevel}</strong></p>
      <div className="progress" role="progressbar" aria-valuenow={levelInfo.progressPercent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${levelInfo.progressPercent}%` }} />
      </div>
    </section>
  );
}
