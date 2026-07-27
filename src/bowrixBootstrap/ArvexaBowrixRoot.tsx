import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BowrixRouteHost} from '../bowrixFlow/BowrixRouteHost';
import {BowrixWelcomeScreen} from '../bowrixScenes/BowrixWelcomeScreen';
import {ArvexaLaunchScreen} from '../bowrixScenes/ArvexaLaunchScreen';
import {colors} from '../bowrixPalette/colors';

const onboardingStorageKey = '@arvexa_bowrix/onboarding_completed';

export function ArvexaBowrixRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(onboardingStorageKey)
      .then(value => setShowOnboarding(value !== 'true'))
      .catch(() => setShowOnboarding(true));
  }, []);

  const finishSplash = useCallback(() => setShowSplash(false), []);
  const finishOnboarding = useCallback(() => {
    AsyncStorage.setItem(onboardingStorageKey, 'true').catch(() => undefined);
    setShowOnboarding(false);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
      {showSplash ? (
        <ArvexaLaunchScreen onComplete={finishSplash} />
      ) : showOnboarding === null ? (
        <View style={styles.loading} />
      ) : showOnboarding ? (
        <BowrixWelcomeScreen onComplete={finishOnboarding} />
      ) : (
        <BowrixRouteHost />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.navy,
  },
});
