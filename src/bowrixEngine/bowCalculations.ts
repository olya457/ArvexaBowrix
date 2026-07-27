import type {BowSetupResult, BowType, Experience} from '../bowrixModels';

const gppByType: Record<BowType, number> = {
  Compound: 6.5,
  Recurve: 8,
  Longbow: 9,
  Traditional: 9.5,
};

const speedBonusByType: Record<BowType, number> = {
  Compound: 35,
  Recurve: 0,
  Longbow: -10,
  Traditional: -15,
};

const bowDifficultyByType: Record<BowType, number> = {
  Compound: 0,
  Recurve: 5,
  Longbow: 10,
  Traditional: 12,
};

const experienceWeightModifier: Record<Experience, number> = {
  Beginner: 0.5,
  Intermediate: 0,
  Advanced: -0.5,
};

const experienceDifficulty: Record<Experience, number> = {
  Beginner: 15,
  Intermediate: 5,
  Advanced: 0,
};

export function calculateBowSetup(
  type: BowType,
  drawWeight: number,
  drawLength: number,
  distance: number,
  experience: Experience,
): BowSetupResult {
  const arrowWeight = Math.round(
    drawWeight * (gppByType[type] + experienceWeightModifier[experience]),
  );
  const rawSpeed =
    180 +
    (drawWeight - 30) * 2.2 +
    (drawLength - 28) * 4 +
    speedBonusByType[type] -
    (arrowWeight / drawWeight - 7) * 5;
  const arrowSpeed = Math.max(140, Math.min(330, Math.round(rawSpeed)));
  const speedMS = arrowSpeed * 0.3048;
  const ratio = Math.min(1, (9.81 * distance) / speedMS ** 2);
  const aimingAngle =
    Math.round(0.5 * Math.asin(ratio) * (180 / Math.PI) * 10) / 10;
  const score = Math.min(
    100,
    distance * 0.55 +
      Math.max(0, 40 - drawWeight) * 0.8 +
      bowDifficultyByType[type] +
      experienceDifficulty[experience],
  );
  const difficulty =
    score <= 30
      ? 'Easy'
      : score <= 55
        ? 'Moderate'
        : score <= 75
          ? 'Challenging'
          : 'Expert';

  return {arrowWeight, arrowSpeed, aimingAngle, difficulty};
}
