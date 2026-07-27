export function calculateScores(scores: string[], count: number) {
  const values = scores
    .slice(0, count)
    .map(value => Math.max(0, Math.min(10, Number(value) || 0)));
  const total = values.reduce((sum, value) => sum + value, 0);
  const best = Math.max(...values);
  const worst = Math.min(...values);
  const spread = best - worst;
  const consistency =
    spread <= 2
      ? 'Excellent'
      : spread <= 4
        ? 'Good'
        : spread <= 6
          ? 'Average'
          : 'Needs Improvement';

  return {average: total / count, total, best, worst, consistency};
}
