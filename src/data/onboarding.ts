import {appAssets} from '../assets';

export const onboardingPages = [
  {
    eyebrow: 'ARVEXA BOWRIX',
    title: 'Master Your\nArchery',
    description:
      'Use smart tools to improve your shooting performance, optimize your bow setup, and track every practice session with ease.',
    image: appAssets.onboardingMasterArchery,
  },
  {
    eyebrow: 'ARVEXA BOWRIX',
    title: 'Fine-Tune Your\nBow',
    description:
      'Calculate recommended bow settings, estimate arrow speed, and find the best setup based on your equipment and shooting distance.',
    image: appAssets.onboardingFineTuneBow,
  },
  {
    eyebrow: 'ARVEXA BOWRIX',
    title: 'Track Every Shot',
    description:
      'Record your scores, calculate averages, and monitor your consistency to see how your accuracy improves over time.',
    image: appAssets.onboardingTrackEveryShot,
  },
  {
    eyebrow: 'ARVEXA BOWRIX',
    title: 'Learn & Improve',
    description:
      'Explore helpful articles, practical tips, and shooting insights designed to help archers of every skill level become more confident and consistent.',
    image: appAssets.onboardingLearnAndImprove,
  },
] as const;
