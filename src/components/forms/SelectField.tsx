import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';

type Props = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function SelectField({label, options, value, onChange}: Props) {
  const [visible, setVisible] = useState(false);

  const select = (option: string) => {
    onChange(option);
    setVisible(false);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        onPress={() => setVisible(true)}
        style={styles.field}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <SafeAreaView edges={['bottom']} style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => item}
              initialScrollIndex={Math.max(0, options.indexOf(value))}
              getItemLayout={(_, index) => ({
                length: 54,
                offset: 54 * index,
                index,
              })}
              renderItem={({item}) => {
                const selected = item === value;
                return (
                  <Pressable
                    onPress={() => select(item)}
                    style={[styles.option, selected && styles.selectedOption]}>
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedText,
                      ]}>
                      {item}
                    </Text>
                    {selected ? <Text style={styles.check}>✓</Text> : null}
                  </Pressable>
                );
              }}
            />
          </SafeAreaView>
        </View>
      </Modal>
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
  field: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.deep,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
  },
  value: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  chevron: {
    color: colors.orange,
    fontSize: 25,
    marginTop: -5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 20, 34, 0.72)',
  },
  sheet: {
    height: '62%',
    backgroundColor: colors.deep,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: 'hidden',
  },
  sheetHeader: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingHorizontal: 18,
  },
  sheetTitle: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  closeButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingLeft: 18,
  },
  closeText: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: '800',
  },
  option: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: colors.card,
  },
  optionText: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  },
  selectedText: {
    color: colors.orange,
    fontWeight: '800',
  },
  check: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: '900',
  },
});
