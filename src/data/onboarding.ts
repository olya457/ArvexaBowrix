import {appAssets} from '../assets';

export const onboardingPages = [
  {
    eyebrow: 'Arrow Metrics',
    title: 'Master Your\nArchery',
    description:
      'Use smart tools to improve your shooting performance, optimize your bow setup, and track every practice session with ease.',
    image: appAssets.onboardingMasterArchery,
  },
  {
    eyebrow: 'Arrow Metrics',
    title: 'Fine-Tune Your\nBow',
    description:
      'Calculate recommended bow settings, estimate arrow speed, and find the best setup based on your equipment and shooting distance.',
    image: appAssets.onboardingFineTuneBow,
  },
  {
    eyebrow: 'Arrow Metrics',
    title: 'Track Every Shot',
    description:
      'Record your scores, calculate averages, and monitor your consistency to see how your accuracy improves over time.',
    image: appAssets.onboardingTrackEveryShot,
  },
  {
    eyebrow: 'Arrow Metrics',
    title: 'Learn & Improve',
    description:
      'Explore helpful articles, practical tips, and shooting insights designed to help archers of every skill level become more confident and consistent.',
    image: appAssets.onboardingLearnAndImprove,
  },
] as const;
