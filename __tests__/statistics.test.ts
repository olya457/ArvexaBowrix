import type {Session} from '../src/core/models';
import {average, summary, total} from '../src/core/statistics';
const item = (id: string, scores: number[]): Session => ({
  id, scores, createdAt: '2026-07-31T00:00:00Z', distance: 30,
  targetSize: 80, conditions: 'Calm', notes: '',
});
test('calculates observed scores', () => {
  expect(total(item('one', [10, 9, 8, 7, 6, 5]))).toBe(45);
  expect(average(item('one', [10, 9, 8, 7, 6, 5]))).toBe(7.5);
});
test('calculates trend', () => {
  const sessions = [
    ...Array.from({length: 5}, (_, i) => item(`new-${i}`, [9, 9])),
    ...Array.from({length: 5}, (_, i) => item(`old-${i}`, [7, 7])),
  ];
  expect(summary(sessions)).toEqual({arrows: 20, overall: 8, best: 9, trend: 2});
});
