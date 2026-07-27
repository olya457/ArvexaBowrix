import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../bowrixPalette/colors';

export function ResultCard({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>R E S U L T</Text>
      {children}
    </View>
  );
}

export function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{label}</Text>
      <Text style={[styles.value, accent && styles.accent]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 17,
    marginBottom: 20,
  },
  heading: {
    fontSize: 10,
    color: colors.orange,
    letterSpacing: 2.5,
    fontWeight: '900',
    marginBottom: 7,
  },
  row: {
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    gap: 16,
  },
  key: {color: colors.muted, fontSize: 14},
  value: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'right',
    flexShrink: 1,
  },
  accent: {color: colors.orange},
});
