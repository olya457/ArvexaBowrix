import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onboardingPages} from '../bowrixLibrary/onboarding';
import {colors} from '../bowrixPalette/colors';

type Props = {
  onComplete: () => void;
};

export function BowrixWelcomeScreen({onComplete}: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const {height} = useWindowDimensions();
  const page = onboardingPages[pageIndex];
  const compact = height < 700;

  const continueOnboarding = () => {
    if (pageIndex === onboardingPages.length - 1) {
      onComplete();
      return;
    }
    setPageIndex(current => current + 1);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.content, compact && styles.compactContent]}>
        <Text style={styles.eyebrow}>{page.eyebrow}</Text>
        <Text style={[styles.title, compact && styles.compactTitle]}>
          {page.title}
        </Text>
        <Text style={[styles.description, compact && styles.compactDescription]}>
          {page.description}
        </Text>

        <View style={styles.indicators}>
          {onboardingPages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index <= pageIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <View style={styles.imageArea}>
          <Image
            source={page.image}
            resizeMode="contain"
            style={[styles.image, compact && styles.compactImage]}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={continueOnboarding}
          style={({pressed}) => [
            styles.button,
            pressed && styles.pressedButton,
          ]}>
          <Text style={styles.buttonText}>
            {pageIndex === onboardingPages.length - 1 ? 'Continue' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 58,
    paddingBottom: 12,
  },
  compactContent: {
    paddingTop: 26,
  },
  eyebrow: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 45,
    letterSpacing: -1.2,
  },
  compactTitle: {
    fontSize: 35,
    lineHeight: 38,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 25,
    marginTop: 22,
    maxWidth: 340,
  },
  compactDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
  indicators: {
    flexDirection: 'row',
    gap: 13,
    marginTop: 28,
  },
  indicator: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#557487',
  },
  activeIndicator: {
    backgroundColor: colors.orange,
  },
  imageArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 210,
  },
  image: {
    width: '96%',
    height: '100%',
    maxHeight: 390,
  },
  compactImage: {
    maxHeight: 260,
  },
  button: {
    minHeight: 59,
    borderRadius: 14,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  pressedButton: {
    opacity: 0.86,
  },
  buttonText: {
    color: colors.deep,
    fontSize: 17,
    fontWeight: '800',
  },
});
