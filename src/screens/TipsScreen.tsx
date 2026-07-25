import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {ScreenHeader} from '../components/layout/ScreenHeader';
import {ScreenScroll} from '../components/layout/ScreenScroll';
import {tips} from '../data/tips';
import {colors} from '../theme/colors';

export function TipsScreen() {
  return (
    <ScreenScroll>
      <ScreenHeader label="Improve" title="Tips" />
      {tips.map((tip, index) => (
        <View key={tip.title} style={styles.card}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{tip.title}</Text>
            <Text style={styles.text}>{tip.text}</Text>
            <Pressable
              style={styles.shareButton}
              onPress={() =>
                Share.share({message: `${tip.title}\n\n${tip.text}`})
              }>
              <Text style={styles.shareText}>Share Tip</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  number: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: '#486F77',
    borderWidth: 1,
    borderColor: '#9B762C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {color: colors.orange, fontWeight: '800'},
  content: {flex: 1},
  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    margin: 3,
  },
  text: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 12,
  },
  shareButton: {
    alignSelf: 'flex-start',
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {color: colors.muted, fontWeight: '700'},
});
