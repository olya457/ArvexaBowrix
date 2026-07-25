import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

export function ReadOnlyField({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {marginBottom: 14},
  label: {
    color: colors.white,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '800',
    marginBottom: 9,
  },
  field: {
    backgroundColor: colors.deep,
    minHeight: 50,
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#226A92',
  },
  value: {color: colors.white, fontSize: 16},
});
