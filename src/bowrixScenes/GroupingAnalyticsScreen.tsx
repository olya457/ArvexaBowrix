import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {appAssets} from '../bowrixMedia';
import {PrimaryButton} from '../bowrixKit/forms/PrimaryButton';
import {StepperField} from '../bowrixKit/forms/StepperField';
import {HeroImage} from '../bowrixKit/layout/HeroImage';
import {ScreenHeader} from '../bowrixKit/layout/ScreenHeader';
import {ScreenScroll} from '../bowrixKit/layout/ScreenScroll';
import {ResultCard, ResultRow} from '../bowrixKit/results/ResultCard';
import {colors} from '../bowrixPalette/colors';
import {calculateScores} from '../bowrixEngine/scoreCalculations';

export function GroupingAnalyticsScreen() {
  const [shotCount, setShotCount] = useState(5);
  const [scores, setScores] = useState(['10', '9', '8', '7', '10']);
  const [showResult, setShowResult] = useState(false);
  const result = useMemo(
    () => calculateScores(scores, shotCount),
    [scores, shotCount],
  );

  const updateCount = (nextCount: number) => {
    const validCount = Math.max(3, Math.min(30, nextCount));
    setShotCount(validCount);
    setScores(current =>
      Array.from({length: validCount}, (_, index) => current[index] ?? '0'),
    );
    setShowResult(false);
  };

  const updateScore = (index: number, text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    const next = [...scores];
    next[index] =
      numeric === '' ? '' : String(Math.min(10, Number(numeric)));
    setScores(next);
    setShowResult(false);
  };

  return (
    <ScreenScroll keyboardAware>
      <HeroImage source={appAssets.scoreAverageHero} />
      <ScreenHeader title="Score Average" />
      <StepperField
        label="NUMBER OF SHOTS"
        value={`${shotCount}`}
        onDecrease={() => updateCount(shotCount - 1)}
        onIncrease={() => updateCount(shotCount + 1)}
      />
      <Text style={styles.label}>ARROW SCORES</Text>
      <View style={styles.grid}>
        {scores.slice(0, shotCount).map((score, index) => (
          <TextInput
            key={index}
            value={score}
            onChangeText={text => updateScore(index, text)}
            keyboardType="number-pad"
            maxLength={2}
            selectTextOnFocus
            accessibilityLabel={`Shot ${index + 1} score`}
            style={styles.scoreInput}
          />
        ))}
      </View>
      <PrimaryButton title="Calculate" onPress={() => setShowResult(true)} />
      {showResult ? (
        <ResultCard>
          <ResultRow
            label="Average"
            value={result.average.toFixed(2)}
            accent
          />
          <ResultRow label="Total" value={`${result.total}`} />
          <ResultRow label="Best Shot" value={`${result.best}`} />
          <ResultRow label="Lowest" value={`${result.worst}`} />
          <ResultRow label="Consistency" value={result.consistency} />
        </ResultCard>
      ) : null}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '800',
    marginBottom: 9,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 14,
  },
  scoreInput: {
    width: 56,
    height: 55,
    borderRadius: 10,
    backgroundColor: colors.deep,
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    padding: 0,
  },
});
