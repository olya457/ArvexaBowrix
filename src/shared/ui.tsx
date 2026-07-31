import React from 'react';
import {KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet,
  Text, TextInput, View} from 'react-native';
import {colors} from '../theme/colors';

export function Screen({title, subtitle, children, keyboard}: {
  title: string; subtitle?: string; children: React.ReactNode; keyboard?: boolean;
}) {
  const body = <ScrollView style={s.flex} contentContainerStyle={s.content}
    keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <Text style={s.brand}>RANGE LEDGER</Text><Text style={s.title}>{title}</Text>
    {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}{children}
  </ScrollView>;
  return keyboard ? <KeyboardAvoidingView style={s.flex}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>{body}</KeyboardAvoidingView> : body;
}
export const Card = ({children}: {children: React.ReactNode}) =>
  <View style={s.card}>{children}</View>;
export function Field({label, value, onChangeText, numeric, multiline}: {
  label: string; value: string; onChangeText: (value: string) => void;
  numeric?: boolean; multiline?: boolean;
}) {
  return <View style={s.fieldWrap}><Text style={s.label}>{label}</Text>
    <TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText}
      keyboardType={numeric ? 'decimal-pad' : 'default'} multiline={multiline}
      style={[s.input, multiline && s.multiline]} /></View>;
}
export function Choice<T extends string>({label, options, value, onChange}: {
  label: string; options: readonly T[]; value: T; onChange: (value: T) => void;
}) {
  return <View style={s.fieldWrap}><Text style={s.label}>{label}</Text><View style={s.row}>
    {options.map(option => <Pressable key={option} onPress={() => onChange(option)}
      style={[s.choice, option === value && s.selected]}>
      <Text style={[s.choiceText, option === value && s.selectedText]}>{option}</Text>
    </Pressable>)}</View></View>;
}
export function Button({title, onPress, secondary}: {
  title: string; onPress: () => void; secondary?: boolean;
}) {
  return <Pressable accessibilityRole="button" onPress={onPress}
    style={[s.button, secondary && s.secondary]}>
    <Text style={[s.buttonText, secondary && s.secondaryText]}>{title}</Text>
  </Pressable>;
}
const s = StyleSheet.create({
  flex: {flex: 1}, content: {padding: 18, paddingBottom: 35},
  brand: {color: colors.orange, fontWeight: '900', fontSize: 11, letterSpacing: 1.7},
  title: {color: colors.white, fontWeight: '900', fontSize: 30, marginTop: 5},
  subtitle: {color: colors.muted, lineHeight: 20, marginTop: 7, marginBottom: 18},
  card: {backgroundColor: colors.card, borderColor: colors.line, borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 14},
  fieldWrap: {marginBottom: 14}, label: {color: colors.white, fontSize: 11,
    fontWeight: '900', letterSpacing: 1.1, marginBottom: 8},
  input: {minHeight: 52, borderRadius: 10, borderColor: colors.line, borderWidth: 1,
    backgroundColor: colors.deep, color: colors.white, fontSize: 16, paddingHorizontal: 13},
  multiline: {minHeight: 88, paddingTop: 13, textAlignVertical: 'top'},
  row: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  choice: {paddingHorizontal: 12, paddingVertical: 11, borderRadius: 9,
    backgroundColor: colors.deep, borderColor: colors.line, borderWidth: 1},
  selected: {backgroundColor: colors.orange, borderColor: colors.orange},
  choiceText: {color: colors.white, fontWeight: '700'}, selectedText: {color: colors.deep},
  button: {minHeight: 54, borderRadius: 13, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.orange, marginVertical: 7},
  secondary: {backgroundColor: 'transparent', borderColor: colors.line, borderWidth: 1},
  buttonText: {color: colors.deep, fontWeight: '900', fontSize: 16},
  secondaryText: {color: colors.white},
});
