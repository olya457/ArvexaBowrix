import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {appAssets} from '../../assets/images';
import {useLedger} from '../../core/LedgerProvider';
import {average, summary} from '../../core/statistics';
import {Card, Screen} from '../../shared/ui';
import {colors} from '../../theme/colors';
export function InsightsScreen() {
  const {sessions} = useLedger();
  const data = summary(sessions);
  return <Screen title="Insights" subtitle="Statistics use only sessions you recorded.">
    <Image source={appAssets.conditionsHero} style={s.hero} />
    <View style={s.grid}><Metric label="SESSIONS" value={`${sessions.length}`} />
      <Metric label="ARROWS" value={`${data.arrows}`} />
      <Metric label="AVG / ARROW" value={data.overall.toFixed(2)} />
      <Metric label="BEST AVG" value={data.best.toFixed(2)} /></View>
    <Card><Text style={s.heading}>Recent session averages</Text>
      {!sessions.length ? <Text style={s.muted}>Record a session to begin.</Text> :
        sessions.slice(0, 8).reverse().map(item => <View key={item.id} style={s.barRow}>
          <Text style={s.date}>{new Date(item.createdAt).toLocaleDateString(undefined,
            {month: 'short', day: 'numeric'})}</Text>
          <View style={s.track}><View style={[s.bar, {width: `${average(item) * 10}%`}]} /></View>
          <Text style={s.value}>{average(item).toFixed(1)}</Text>
        </View>)}</Card>
    <Card><Text style={s.heading}>Recent trend</Text><Text style={s.muted}>
      {sessions.length < 6 ? 'Add six sessions for a meaningful comparison.' :
        data.trend > 0.1 ? `Improving by ${data.trend.toFixed(2)} points per arrow.` :
          data.trend < -0.1 ? `Down ${Math.abs(data.trend).toFixed(2)} points per arrow.` :
            'Performance is stable.'}</Text></Card>
  </Screen>;
}
function Metric({label, value}: {label: string; value: string}) {
  return <View style={s.metric}><Text style={s.metricValue}>{value}</Text>
    <Text style={s.metricLabel}>{label}</Text></View>;
}
const s = StyleSheet.create({
  hero: {height: 155, width: '100%', resizeMode: 'contain'},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14},
  metric: {width: '48%', backgroundColor: colors.card, borderRadius: 14, padding: 14,
    borderColor: colors.line, borderWidth: 1},
  metricValue: {color: colors.orange, fontSize: 24, fontWeight: '900'},
  metricLabel: {color: colors.muted, fontSize: 10, marginTop: 4},
  heading: {color: colors.white, fontSize: 17, fontWeight: '900'},
  muted: {color: colors.muted, lineHeight: 20, marginTop: 8},
  barRow: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
  date: {color: colors.muted, width: 52, fontSize: 11}, track: {flex: 1, height: 12,
    backgroundColor: colors.deep, borderRadius: 6, overflow: 'hidden'},
  bar: {height: 12, backgroundColor: colors.orange}, value: {color: colors.white,
    width: 36, textAlign: 'right', fontWeight: '800'},
});
