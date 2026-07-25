import React, {useState} from 'react';
import {View} from 'react-native';
import {appAssets} from '../assets';
import {ChoiceField} from '../components/forms/ChoiceField';
import {PrimaryButton} from '../components/forms/PrimaryButton';
import {StepperField} from '../components/forms/StepperField';
import {HeroImage} from '../components/layout/HeroImage';
import {ScreenHeader} from '../components/layout/ScreenHeader';
import {ScreenScroll} from '../components/layout/ScreenScroll';
import {ResultCard, ResultRow} from '../components/results/ResultCard';
import type {BowSetupResult, BowType, Experience} from '../types';
import {calculateBowSetup} from '../utils/bowCalculations';

const bowTypes: BowType[] = [
  'Recurve',
  'Compound',
  'Longbow',
  'Traditional',
];
const experienceLevels: Experience[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

export function BowSetupScreen() {
  const [bowType, setBowType] = useState<BowType>('Recurve');
  const [drawWeight, setDrawWeight] = useState(40);
  const [drawLength, setDrawLength] = useState(28);
  const [distance, setDistance] = useState(30);
  const [experience, setExperience] =
    useState<Experience>('Intermediate');
  const [result, setResult] = useState<BowSetupResult | null>(null);

  const calculate = () => {
    setResult(
      calculateBowSetup(
        bowType,
        drawWeight,
        drawLength,
        distance,
        experience,
      ),
    );
  };

  return (
    <ScreenScroll>
      <View style={{marginTop: 20}}>
        <HeroImage source={appAssets.bowSetupHero} />
      </View>
      <ScreenHeader title="Bow Setup" />
      <ChoiceField
        label="BOW TYPE"
        items={bowTypes}
        value={bowType}
        onChange={setBowType}
      />
      <StepperField
        label="DRAW WEIGHT"
        value={`${drawWeight} lb`}
        onDecrease={() => setDrawWeight(Math.max(20, drawWeight - 1))}
        onIncrease={() => setDrawWeight(Math.min(70, drawWeight + 1))}
      />
      <StepperField
        label="DRAW LENGTH"
        value={`${drawLength} in`}
        onDecrease={() => setDrawLength(Math.max(24, drawLength - 0.5))}
        onIncrease={() => setDrawLength(Math.min(32, drawLength + 0.5))}
      />
      <StepperField
        label="TARGET DISTANCE"
        value={`${distance} m`}
        onDecrease={() => setDistance(Math.max(10, distance - 5))}
        onIncrease={() => setDistance(Math.min(100, distance + 5))}
      />
      <ChoiceField
        label="EXPERIENCE"
        items={experienceLevels}
        value={experience}
        onChange={setExperience}
      />
      <PrimaryButton title="Calculate Setup" onPress={calculate} />
      {result ? (
        <ResultCard>
          <ResultRow
            label="Arrow Weight"
            value={`${result.arrowWeight} gr`}
            accent
          />
          <ResultRow label="Arrow Speed" value={`${result.arrowSpeed} fps`} />
          <ResultRow
            label="Aiming Angle"
            value={`${result.aimingAngle.toFixed(1)}°`}
          />
          <ResultRow label="Difficulty" value={result.difficulty} />
        </ResultCard>
      ) : null}
    </ScreenScroll>
  );
}