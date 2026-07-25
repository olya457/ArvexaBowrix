import type {Weather} from '../types';

const directions = [
  'North',
  'North-East',
  'East',
  'South-East',
  'South',
  'South-West',
  'West',
  'North-West',
];

const vary = (value: number, amount: number, min: number, max: number) =>
  Math.max(
    min,
    Math.min(max, value + Math.round((Math.random() * 2 - 1) * amount)),
  );

export function createWeather(previous?: Weather): Weather {
  if (!previous) {
    return {
      temperature: Math.round(12 + Math.random() * 14),
      wind: Math.round(2 + Math.random() * 12),
      direction: directions[Math.floor(Math.random() * directions.length)],
      humidity: Math.round(38 + Math.random() * 35),
      pressure: Math.round(998 + Math.random() * 27),
    };
  }

  return {
    temperature: vary(previous.temperature, 2, -5, 35),
    wind: vary(previous.wind, 3, 0, 30),
    direction:
      Math.random() > 0.65
        ? directions[Math.floor(Math.random() * directions.length)]
        : previous.direction,
    humidity: vary(previous.humidity, 5, 25, 95),
    pressure: vary(previous.pressure, 4, 980, 1040),
  };
}

export function evaluateWeather(weather: Weather) {
  const rating =
    weather.wind <= 5 &&
    weather.temperature >= 15 &&
    weather.temperature <= 24
      ? 'Ideal'
      : weather.wind <= 10 &&
          weather.temperature >= 8 &&
          weather.temperature <= 29
        ? 'Good'
        : weather.wind <= 18
          ? 'Fair'
          : 'Unfavorable';
  const recommendations = {
    Ideal: 'Excellent conditions for accurate target practice.',
    Good: 'Comfortable conditions. Allow slightly for the breeze.',
    Fair: 'Use caution and compensate for wind before each shot.',
    Unfavorable: 'Strong wind may reduce accuracy and comfort.',
  };

  return {rating, recommendation: recommendations[rating]};
}
