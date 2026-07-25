import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';
import type {TabId} from '../../types';

const tabs: {id: TabId; icon: string; label: string}[] = [
  {id: 'conditions', icon: '☁', label: 'Conditions'},
  {id: 'setup', icon: '⌁', label: 'Bow setup'},
  {id: 'score', icon: '◎', label: 'Score average'},
  {id: 'speed', icon: 'ϟ', label: 'Arrow speed'},
  {id: 'articles', icon: '▢', label: 'Articles'},
  {id: 'tips', icon: '♧', label: 'Tips'},
];

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export function BottomTabBar({activeTab, onChange}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const active = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{selected: active}}
            onPress={() => onChange(tab.id)}
            style={styles.tab}>
            <Text style={[styles.icon, active && styles.activeIcon]}>
              {tab.icon}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.deep,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingHorizontal: 8,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#64869C',
    fontSize: 26,
    fontWeight: '500',
  },
  activeIcon: {
    color: colors.orange,
  },
});
