import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ImageBackground, Pressable, StatusBar, StyleSheet,
  Text, View, type ImageSourcePropType} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {appAssets} from '../assets/images';
import {LedgerProvider, useLedger} from '../core/LedgerProvider';
import {EquipmentScreen} from '../features/equipment/EquipmentScreen';
import {InsightsScreen} from '../features/insights/InsightsScreen';
import {JournalScreen, SessionEditor} from '../features/journal/JournalScreen';
import {LearnScreen} from '../features/learn/LearnScreen';
import {colors} from '../theme/colors';
type Tab = 'Journal' | 'Insights' | 'Equipment' | 'Guide';
const tabs: Tab[] = ['Journal', 'Insights', 'Equipment', 'Guide'];
const tabIcons: Record<Tab, string> = {
  Journal: '🎯',
  Insights: '📊',
  Equipment: '🏹',
  Guide: '📚',
};
const onboardingKey = '@range-ledger/onboarding-v1';
const onboardingPages: Array<{
  title: string;
  description: string;
  image: ImageSourcePropType;
}> = [
  {
    title: 'Record every session',
    description: 'Save distance, target size, arrow scores, range conditions and practice notes in your journal.',
    image: appAssets.onboardingTrackEveryShot,
  },
  {
    title: 'Understand your progress',
    description: 'Review session totals, arrow averages, your best result and recent performance trends.',
    image: appAssets.onboardingMasterArchery,
  },
  {
    title: 'Keep your setup ready',
    description: 'Store bow and arrow specifications, add tuning notes and use the field guide for safer practice.',
    image: appAssets.onboardingFineTuneBow,
  },
];
export function RangeLedgerApp() {
  return <SafeAreaProvider><LedgerProvider><Content /></LedgerProvider></SafeAreaProvider>;
}
function Content() {
  const {ready} = useLedger();
  const [tab, setTab] = useState<Tab>('Journal');
  const [editing, setEditing] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 5000);
    AsyncStorage.getItem(onboardingKey)
      .then(value => setOnboardingDone(value === 'done'))
      .catch(() => setOnboardingDone(false));
    return () => clearTimeout(timer);
  }, []);

  if (!ready || !splashDone || onboardingDone === null) { return <SplashScreen />; }
  if (!onboardingDone) {
    return <OnboardingScreen onDone={() => {
      setOnboardingDone(true);
      AsyncStorage.setItem(onboardingKey, 'done').catch(() => undefined);
    }} />;
  }
  const screen = editing ? <SessionEditor onDone={() => setEditing(false)} /> :
    tab === 'Journal' ? <JournalScreen onAdd={() => setEditing(true)} /> :
      tab === 'Insights' ? <InsightsScreen /> :
        tab === 'Equipment' ? <EquipmentScreen /> : <LearnScreen />;
  return <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
    <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
    <View style={s.content}>{screen}</View>
    {!editing ? <View accessibilityRole="tablist" style={s.tabs}>{tabs.map(item =>
      <Pressable accessibilityRole="tab" accessibilityState={{selected: item === tab}}
        accessibilityLabel={item} key={item} style={s.tab} onPress={() => setTab(item)}>
        <Text style={[s.tabIcon, item === tab && s.active]}>{tabIcons[item]}</Text>
      </Pressable>)}</View> : null}
  </SafeAreaView>;
}

function SplashScreen() {
  return <ImageBackground source={appAssets.splashBackground} resizeMode="cover" style={s.loading}>
    <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
    <Text style={s.splashTitle}>RANGE <Text style={s.splashAccent}>LEDGER</Text></Text>
    <View style={s.splashLine} />
    <ActivityIndicator size="small" color={colors.orange} style={s.spinner} />
  </ImageBackground>;
}

function OnboardingScreen({onDone}: {onDone: () => void}) {
  const [page, setPage] = useState(0);
  const item = onboardingPages[page];
  const lastPage = page === onboardingPages.length - 1;
  return <SafeAreaView style={s.onboarding} edges={['top', 'bottom']}>
    <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
    <Image source={item.image} resizeMode="contain" style={s.onboardingImage} />
    <View style={s.onboardingCopy}>
      <Text style={s.onboardingTitle}>{item.title}</Text>
      <Text style={s.onboardingDescription}>{item.description}</Text>
      <View style={s.dots}>
        {onboardingPages.map((_, index) =>
          <View key={index} style={[s.dot, index === page && s.activeDot]} />)}
      </View>
      <Pressable accessibilityRole="button" style={s.nextButton}
        onPress={() => lastPage ? onDone() : setPage(current => current + 1)}>
        <Text style={s.nextButtonText}>{lastPage ? 'Get started' : 'Next'}</Text>
      </Pressable>
    </View>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.navy}, content: {flex: 1},
  loading: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.navy},
  splashTitle: {color: colors.white, fontSize: 34, fontWeight: '900', letterSpacing: 4,
    textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.35)', textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 8},
  splashAccent: {color: colors.orange},
  splashLine: {width: 72, height: 3, borderRadius: 2, backgroundColor: colors.orange,
    marginTop: 18},
  spinner: {marginTop: 28},
  onboarding: {flex: 1, backgroundColor: colors.navy},
  onboardingImage: {flex: 1, width: '100%'},
  onboardingCopy: {paddingHorizontal: 28, paddingBottom: 24, alignItems: 'center'},
  onboardingTitle: {color: colors.white, fontSize: 30, fontWeight: '900', textAlign: 'center'},
  onboardingDescription: {color: colors.muted, fontSize: 16, lineHeight: 24,
    textAlign: 'center', marginTop: 12, minHeight: 72},
  dots: {flexDirection: 'row', gap: 8, marginVertical: 22},
  dot: {width: 8, height: 8, borderRadius: 4, backgroundColor: colors.line},
  activeDot: {width: 24, backgroundColor: colors.orange},
  nextButton: {width: '100%', minHeight: 56, borderRadius: 14, alignItems: 'center',
    justifyContent: 'center', backgroundColor: colors.orange},
  nextButtonText: {color: colors.deep, fontSize: 16, fontWeight: '900'},
  tabs: {minHeight: 68, flexDirection: 'row', backgroundColor: colors.deep,
    borderTopColor: colors.line, borderTopWidth: 1},
  tab: {flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 60},
  tabIcon: {fontSize: 25, opacity: 0.55},
  active: {opacity: 1},
});
