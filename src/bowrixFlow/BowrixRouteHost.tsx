import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabBar} from '../bowrixKit/navigation/BottomTabBar';
import {ArrowVelocityLabScreen} from '../bowrixScenes/ArrowVelocityLabScreen';
import {ArcheryLibraryScreen} from '../bowrixScenes/ArcheryLibraryScreen';
import {BowTuningWorkbenchScreen} from '../bowrixScenes/BowTuningWorkbenchScreen';
import {RangeWeatherScreen} from '../bowrixScenes/RangeWeatherScreen';
import {GroupingAnalyticsScreen} from '../bowrixScenes/GroupingAnalyticsScreen';
import {PrecisionTipsScreen} from '../bowrixScenes/PrecisionTipsScreen';
import {colors} from '../bowrixPalette/colors';
import type {MainStackParamList, TabId} from '../bowrixModels';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function BowrixRouteHost() {
  const navigationRef = useNavigationContainerRef<MainStackParamList>();
  const [activeTab, setActiveTab] = useState<TabId>('conditions');

  const syncActiveTab = useCallback(() => {
    const routeName = navigationRef.getCurrentRoute()?.name;
    if (routeName) {
      setActiveTab(routeName);
    }
  }, [navigationRef]);

  const navigateToTab = useCallback(
    (tab: TabId) => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(tab);
      }
    },
    [navigationRef],
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={syncActiveTab}
      onStateChange={syncActiveTab}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <Stack.Navigator
            initialRouteName="conditions"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              contentStyle: styles.screen,
            }}>
            <Stack.Screen name="conditions" component={RangeWeatherScreen} />
            <Stack.Screen name="setup" component={BowTuningWorkbenchScreen} />
            <Stack.Screen name="score" component={GroupingAnalyticsScreen} />
            <Stack.Screen name="speed" component={ArrowVelocityLabScreen} />
            <Stack.Screen name="articles" component={ArcheryLibraryScreen} />
            <Stack.Screen name="tips" component={PrecisionTipsScreen} />
          </Stack.Navigator>
        </View>
        <BottomTabBar activeTab={activeTab} onChange={navigateToTab} />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  screen: {
    backgroundColor: colors.navy,
  },
});
