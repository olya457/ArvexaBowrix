import React from 'react';
import {Image, type ImageSourcePropType, StyleSheet} from 'react-native';

export function HeroImage({source}: {source: ImageSourcePropType}) {
  return <Image source={source} resizeMode="contain" style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {height: 285, width: '100%', marginTop: -10, marginBottom: 5},
});
