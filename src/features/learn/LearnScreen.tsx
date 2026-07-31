import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {appAssets} from '../../assets/images';
import {Card, Screen} from '../../shared/ui';
import {colors} from '../../theme/colors';
const guides = [
  ['Pre-session safety check', 'Inspect limbs, string, nocks and fletching. Confirm the target and backstop are rated for your equipment and follow all range commands.'],
  ['Build useful session notes', 'Record observable facts: distance, target size, scores, conditions and one setup change at a time.'],
  ['Read averages responsibly', 'Compare several sessions at similar distances. A small sample can change sharply and should not be treated as a professional recommendation.'],
  ['Equipment compatibility', 'Confirm spine and safe draw-weight limits with manufacturer charts or a qualified archery technician. This app is a record, not a compatibility calculator.'],
];
export function LearnScreen() {
  const [open, setOpen] = useState(0);
  return <Screen title="Field guide"
    subtitle="Practical guidance for collecting reliable training records.">
    <Image source={appAssets.bowRecurve} style={s.hero} />
    {guides.map(([title, text], index) => <Pressable key={title}
      onPress={() => setOpen(open === index ? -1 : index)}><Card>
      <Text style={s.heading}>{index + 1}. {title}</Text>
      {open === index ? <Text style={s.text}>{text}</Text> : null}
    </Card></Pressable>)}
    <Text style={s.disclaimer}>Range Ledger records training data. It does not replace
      equipment manuals, coaching, range rules or professional safety advice.</Text>
  </Screen>;
}
const s = StyleSheet.create({
  hero: {height: 185, width: '100%', resizeMode: 'contain'},
  heading: {color: colors.white, fontSize: 16, fontWeight: '900'},
  text: {color: colors.muted, lineHeight: 21, marginTop: 10},
  disclaimer: {color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8},
});
