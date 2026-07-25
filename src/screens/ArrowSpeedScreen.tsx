import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {appAssets} from '../assets';
import {HorizontalChoiceField} from '../components/forms/HorizontalChoiceField';
import {PrimaryButton} from '../components/forms/PrimaryButton';
import {ReadOnlyField} from '../components/forms/ReadOnlyField';
import {HeroImage} from '../components/layout/HeroImage';
import {ScreenHeader} from '../components/layout/ScreenHeader';
import {ScreenScroll} from '../components/layout/ScreenScroll';
import {ResultCard, ResultRow} from '../components/results/ResultCard';
import {colors} from '../theme/colors';

const distanceOptions = Array.from({length: 19}, (_, index) => 10 + index * 5);

export function ArrowSpeedScreen() {
  const [distance, setDistance] = useState(30);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) {
      return;
    }
    const timer = setInterval(
      () => setElapsed((Date.now() - startedAt.current) / 1000),
      20,
    );
    return () => clearInterval(timer);
  }, [running]);

  const toggleTimer = () => {
    if (running) {
      setRunning(false);
      setShowResult(true);
      return;
    }
    startedAt.current = Date.now();
    setElapsed(0);
    setShowResult(false);
    setRunning(true);
  };

  const speed = distance / Math.max(0.01, elapsed);
  const rating =
    speed < 45
      ? 'Slow'
      : speed <= 60
        ? 'Average'
        : speed <= 75
          ? 'Fast'
          : 'Very Fast';

  return (
    <ScreenScroll>
      <HeroImage source={appAssets.arrowSpeedHero} />
      <ScreenHeader title="Arrow Speed" />
      <HorizontalChoiceField
        label="DISTANCE"
        options={distanceOptions}
        value={distance}
        suffix=" m"
        onChange={value => {
          setDistance(value);
          setShowResult(false);
        }}
      />
      <ReadOnlyField label="FLIGHT TIME" value={`${elapsed.toFixed(2)} s`} />
      <PrimaryButton
        title={
          running ? 'Stop Timer' : elapsed > 0 ? 'Start Again' : 'Start Timer'
        }
        onPress={toggleTimer}
      />
      {showResult ? (
        <ResultCard>
          <Text style={styles.speed}>
            {speed.toFixed(1)}
            <Text style={styles.unit}> m/s</Text>
          </Text>
          <ResultRow
            label="Equivalent"
            value={`${(speed * 3.6).toFixed(0)} km/h`}
          />
          <ResultRow label="Rating" value={rating} accent />
          <Text style={styles.note}>
            This manual timer provides an approximate result and is not a
            professional measurement instrument.
          </Text>
        </ResultCard>
      ) : null}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  speed: {
    fontSize: 39,
    fontWeight: '900',
    color: colors.orange,
    marginVertical: 18,
  },
  unit: {fontSize: 18},
  note: {fontSize: 12, color: colors.muted, lineHeight: 18, marginTop: 14},
});
