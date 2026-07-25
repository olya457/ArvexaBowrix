import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

type Props<T extends string> = {
  label: string;
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function ChoiceField<T extends string>({
  label,
  items,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.items}>
        {items.map(item => {
          const selected = value === item;
          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              style={[styles.item, selected && styles.selectedItem]}>
              <Text style={[styles.text, selected && styles.selectedText]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
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
  items: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  item: {
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 9,
    backgroundColor: colors.deep,
    borderWidth: 1,
    borderColor: colors.line,
  },
  selectedItem: {backgroundColor: colors.orange, borderColor: colors.orange},
  text: {color: colors.white, fontWeight: '700', fontSize: 13},
  selectedText: {color: colors.deep},
});
