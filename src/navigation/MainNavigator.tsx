import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabBar} from '../components/navigation/BottomTabBar';
import {ArrowSpeedScreen} from '../screens/ArrowSpeedScreen';
import {ArticlesScreen} from '../screens/ArticlesScreen';
import {BowSetupScreen} from '../screens/BowSetupScreen';
import {ConditionsScreen} from '../screens/ConditionsScreen';
import {ScoreAverageScreen} from '../screens/ScoreAverageScreen';
import {TipsScreen} from '../screens/TipsScreen';
import {colors} from '../theme/colors';
import type {TabId} from '../types';

export function MainNavigator() {
  const [activeTab, setActiveTab] = useState<TabId>('conditions');

  const renderScreen = () => {
    switch (activeTab) {
      case 'setup':
        return <BowSetupScreen />;
      case 'score':
        return <ScoreAverageScreen />;
      case 'speed':
        return <ArrowSpeedScreen />;
      case 'articles':
        return <ArticlesScreen />;
      case 'tips':
        return <TipsScreen />;
      default:
        return <ConditionsScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
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
});
