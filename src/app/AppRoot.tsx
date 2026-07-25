import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from '../navigation/MainNavigator';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {colors} from '../theme/colors';

const onboardingStorageKey = '@arvexa_bowrix/onboarding_completed';

export function AppRoot() {
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
        <SplashScreen onComplete={finishSplash} />
      ) : showOnboarding === null ? (
        <View style={styles.loading} />
      ) : showOnboarding ? (
        <OnboardingScreen onComplete={finishOnboarding} />
      ) : (
        <MainNavigator />
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
