import type {Session} from './models';
export const total = (item: Session) =>
  item.scores.reduce((sum, value) => sum + value, 0);
export const average = (item: Session) =>
  item.scores.length ? total(item) / item.scores.length : 0;
export function summary(items: Session[]) {
  const arrows = items.reduce((sum, item) => sum + item.scores.length, 0);
  const points = items.reduce((sum, item) => sum + total(item), 0);
  const recent = items.slice(0, 5);
  const previous = items.slice(5, 10);
  const groupAverage = (group: Session[]) => group.length
    ? group.reduce((sum, item) => sum + average(item), 0) / group.length : 0;
  return {
    arrows,
    overall: arrows ? points / arrows : 0,
    best: items.reduce((value, item) => Math.max(value, average(item)), 0),
    trend: groupAverage(recent) - groupAverage(previous),
  };
}
