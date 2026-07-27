import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../bowrixPalette/colors';

type Props = {
  title: string;
  label?: string;
};

export function ScreenHeader({title, label}: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label.toUpperCase()}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 22},
  label: {
    color: colors.orange,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 2.4,
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
});
