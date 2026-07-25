import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {appAssets} from '../assets';
import {PrimaryButton} from '../components/forms/PrimaryButton';
import {SelectField} from '../components/forms/SelectField';
import {HeroImage} from '../components/layout/HeroImage';
import {ScreenHeader} from '../components/layout/ScreenHeader';
import {ScreenScroll} from '../components/layout/ScreenScroll';
import {ResultCard, ResultRow} from '../components/results/ResultCard';
import {colors} from '../theme/colors';
import {evaluateWeather} from '../utils/weatherSimulation';

const temperatureOptions = Array.from(
  {length: 26},
  (_, index) => `${-5 + index * 2}°C`,
);
const windOptions = Array.from(
  {length: 31},
  (_, index) => `${index} km/h`,
);
const directionOptions = [
  'North',
  'North by East',
  'North-North-East',
  'North-East by North',
  'North-East',
  'North-East by East',
  'East-North-East',
  'East by North',
  'East',
  'East by South',
  'East-South-East',
  'South-East by East',
  'South-East',
  'South-East by South',
  'South-South-East',
  'South by East',
  'South',
  'South by West',
  'South-South-West',
  'South-West by South',
  'South-West',
  'South-West by West',
  'West-South-West',
  'West by South',
  'West',
  'West by North',
  'West-North-West',
  'North-West by West',
  'North-West',
  'North-West by North',
  'North-North-West',
  'North by West',
];
const humidityOptions = Array.from(
  {length: 21},
  (_, index) => `${20 + index * 4}%`,
);
const pressureOptions = Array.from(
  {length: 26},
  (_, index) => `${970 + index * 3} hPa`,
);

export function ConditionsScreen() {
  const [temperature, setTemperature] = useState('21°C');
  const [wind, setWind] = useState('9 km/h');
  const [direction, setDirection] = useState('South-East');
  const [humidity, setHumidity] = useState('64%');
  const [pressure, setPressure] = useState('1006 hPa');
  const [showResult, setShowResult] = useState(false);
  const weather = {
    temperature: Number.parseInt(temperature, 10),
    wind: Number.parseInt(wind, 10),
    direction,
    humidity: Number.parseInt(humidity, 10),
    pressure: Number.parseInt(pressure, 10),
  };
  const evaluation = evaluateWeather(weather);

  const select =
    (setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      setShowResult(false);
    };

  return (
    <ScreenScroll>
      <HeroImage source={appAssets.conditionsHero} />
      <ScreenHeader title="Shooting Conditions" />
      <SelectField
        label="TEMPERATURE"
        options={temperatureOptions}
        value={temperature}
        onChange={select(setTemperature)}
      />
      <SelectField
        label="WIND SPEED"
        options={windOptions}
        value={wind}
        onChange={select(setWind)}
      />
      <SelectField
        label="WIND DIRECTION"
        options={directionOptions}
        value={direction}
        onChange={select(setDirection)}
      />
      <SelectField
        label="HUMIDITY"
        options={humidityOptions}
        value={humidity}
        onChange={select(setHumidity)}
      />
      <SelectField
        label="PRESSURE"
        options={pressureOptions}
        value={pressure}
        onChange={select(setPressure)}
      />
      <PrimaryButton title="Calculate" onPress={() => setShowResult(true)} />
      {showResult ? (
        <ResultCard>
          <ResultRow label="Conditions" value={evaluation.rating} accent />
          <ResultRow label="Wind" value={`${weather.wind} km/h`} />
          <ResultRow
            label="Temperature"
            value={`${weather.temperature}°C`}
          />
          <Text style={styles.recommendationLabel}>Recommendation</Text>
          <Text style={styles.recommendation}>
            {evaluation.recommendation}
          </Text>
        </ResultCard>
      ) : null}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  recommendationLabel: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 14,
  },
  recommendation: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});
