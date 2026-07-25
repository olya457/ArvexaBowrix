import React, {useRef} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../theme/colors';

type Props = {
  label: string;
  options: readonly number[];
  value: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export function HorizontalChoiceField({
  label,
  options,
  value,
  suffix = '',
  onChange,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.items}>
        {options.map(option => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.item, selected && styles.selectedItem]}>
              <Text style={[styles.text, selected && styles.selectedText]}>
                {option}
                {suffix}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  label: {
    color: colors.white,
    fontSize: 11,
    letterSpacing: 1.4,
    fontWeight: '800',
    marginBottom: 9,
  },
  items: {
    gap: 8,
    paddingRight: 18,
  },
  item: {
    minWidth: 67,
    minHeight: 52,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.deep,
    borderWidth: 1,
    borderColor: colors.line,
  },
  selectedItem: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  selectedText: {
    color: colors.deep,
  },
});
