import { describe, expect, it } from 'vitest';
import { calculateDailyXp, getLevelInfo } from './xp';

describe('calculateDailyXp', () => {
  it('dia com musculação apenas', () => {
    expect(calculateDailyXp({ musculacao: true, corrida: false, execucao: false, social: false })).toBe(20);
  });

  it('dia com corrida apenas', () => {
    expect(calculateDailyXp({ musculacao: false, corrida: true, execucao: false, social: false })).toBe(25);
  });

  it('dia com musculação + execução', () => {
    expect(calculateDailyXp({ musculacao: true, corrida: false, execucao: true, social: false })).toBe(45);
  });

  it('dia com corrida + social', () => {
    expect(calculateDailyXp({ musculacao: false, corrida: true, execucao: false, social: true })).toBe(35);
  });

  it('dia sem treino físico', () => {
    expect(calculateDailyXp({ musculacao: false, corrida: false, execucao: false, social: true })).toBe(-10);
  });

  it('dia com todas as atividades', () => {
    expect(calculateDailyXp({ musculacao: true, corrida: true, execucao: true, social: true })).toBe(80);
  });
});

describe('progressão de nível', () => {
  it('cálculo de nível com base no XP acumulado', () => {
    const info = getLevelInfo(320);
    expect(info.level).toBe(3);
    expect(info.currentLevelMinXp).toBe(250);
    expect(info.nextLevelMinXp).toBe(450);
  });

  it('cálculo de progresso até o próximo nível', () => {
    const info = getLevelInfo(320);
    expect(info.xpToNextLevel).toBe(130);
    expect(info.progressPercent).toBe(35);
  });
});
