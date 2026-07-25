import type {ImageSourcePropType} from 'react-native';

export type AppPhase = 'splash' | 'onboarding' | 'main';
export type TabId = 'conditions' | 'setup' | 'score' | 'speed' | 'articles' | 'tips';
export type BowType = 'Recurve' | 'Compound' | 'Longbow' | 'Traditional';
export type Experience = 'Beginner' | 'Intermediate' | 'Advanced';

export type Weather = {
  temperature: number;
  wind: number;
  direction: string;
  humidity: number;
  pressure: number;
};

export type BowSetupResult = {
  arrowWeight: number;
  arrowSpeed: number;
  aimingAngle: number;
  difficulty: string;
};

export type Article = {
  title: string;
  image: ImageSourcePropType;
  text: string;
};

export type OnboardingPage = {
  title: string;
  text: string;
  image: ImageSourcePropType;
};

export type Tip = {
  title: string;
  text: string;
};
