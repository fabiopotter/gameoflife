import type { LevelInfo } from '../types';

type Props = {
  levelInfo: LevelInfo;
};

export function ProgressCard({ levelInfo }: Props) {
  return (
    <section className="card progress-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Progresso</p>
          <h2>Nível atual</h2>
        </div>
        <span className="badge">Lv. {levelInfo.level}</span>
      </div>

      <div className="metric-grid">
        <div className="metric-card accent">
          <span>XP total</span>
          <strong>{levelInfo.totalXp}</strong>
        </div>
        <div className="metric-card">
          <span>Para o próximo nível</span>
          <strong>{levelInfo.xpToNextLevel}</strong>
        </div>
      </div>
      <div className="progress-copy">
        <span>{levelInfo.progressPercent}% do nível</span>
        {levelInfo.nextLevelMinXp ? <small>Meta: {levelInfo.nextLevelMinXp} XP</small> : <small>Nível máximo alcançado</small>}
      </div>
      <div className="progress" role="progressbar" aria-valuenow={levelInfo.progressPercent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${levelInfo.progressPercent}%` }} />
      </div>
    </section>
  );
}
