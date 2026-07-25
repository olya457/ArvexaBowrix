import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
};

export function PrimaryButton({title, onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 55,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    marginTop: 6,
    marginBottom: 18,
  },
  pressed: {opacity: 0.78, transform: [{scale: 0.99}]},
  text: {color: '#042C46', fontSize: 17, fontWeight: '800'},
});
