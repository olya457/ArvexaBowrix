import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

type Props = {
  label: string;
  value: string;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function StepperField({
  label,
  value,
  onDecrease,
  onIncrease,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable onPress={onDecrease} style={styles.button}>
          <Text style={styles.sign}>−</Text>
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable onPress={onIncrease} style={styles.button}>
          <Text style={styles.sign}>+</Text>
        </Pressable>
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
  stepper: {
    minHeight: 52,
    flexDirection: 'row',
    backgroundColor: colors.deep,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#226A92',
    alignItems: 'center',
  },
  button: {
    width: 58,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {fontSize: 27, color: colors.orange, fontWeight: '500'},
  value: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
