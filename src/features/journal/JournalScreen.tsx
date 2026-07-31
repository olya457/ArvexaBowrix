import React, {useState} from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {appAssets} from '../../assets/images';
import {useLedger} from '../../core/LedgerProvider';
import {average, total} from '../../core/statistics';
import {Button, Card, Choice, Field, Screen} from '../../shared/ui';
import {colors} from '../../theme/colors';

export function JournalScreen({onAdd}: {onAdd: () => void}) {
  const {sessions, deleteSession} = useLedger();
  const [open, setOpen] = useState<string | null>(null);
  return <Screen title="Practice journal"
    subtitle="A permanent record of every round, condition and adjustment.">
    <Image source={appAssets.scoreAverageHero} style={s.hero} />
    <Button title="＋ Record a session" onPress={onAdd} />
    {!sessions.length ? <Card><Text style={s.heading}>No sessions yet</Text>
      <Text style={s.muted}>Record observed scores to build reliable averages and progress trends.</Text>
    </Card> : sessions.map(item => <Pressable key={item.id}
      onPress={() => setOpen(open === item.id ? null : item.id)}>
      <Card><View style={s.row}><View style={s.flex}>
        <Text style={s.heading}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={s.muted}>{item.distance} m · {item.targetSize} cm · {item.scores.length} arrows</Text>
      </View><Text style={s.average}>{average(item).toFixed(1)}</Text></View>
      {open === item.id ? <View style={s.details}>
        <Text style={s.body}>Scores: {item.scores.join(', ')}</Text>
        <Text style={s.body}>Total: {total(item)} · {item.conditions}</Text>
        {item.equipmentName ? <Text style={s.body}>Equipment: {item.equipmentName}</Text> : null}
        {item.notes ? <Text style={s.muted}>{item.notes}</Text> : null}
        <Pressable onPress={() => Alert.alert('Delete session?', 'This cannot be undone.', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', style: 'destructive', onPress: () => deleteSession(item.id)},
        ])}><Text style={s.delete}>Delete session</Text></Pressable>
      </View> : null}</Card>
    </Pressable>)}
  </Screen>;
}

const conditions = ['Calm', 'Light wind', 'Windy', 'Indoor'] as const;
const distances = ['10', '18', '20', '25', '30', '40', '50', '60', '70', '90'];
const targetSizes = ['20', '40', '60', '80', '122'];
const scoreOptions = ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export function SessionEditor({onDone}: {onDone: () => void}) {
  const {addSession, equipmentProfiles} = useLedger();
  const [distance, setDistance] = useState('30');
  const [targetSize, setTargetSize] = useState('80');
  const [condition, setCondition] = useState<(typeof conditions)[number]>('Calm');
  const [equipmentName, setEquipmentName] = useState(equipmentProfiles[0]?.name ?? '');
  const [scores, setScores] = useState(['', '', '', '', '', '']);
  const [notes, setNotes] = useState('');
  const save = () => {
    const entered = scores.filter(Boolean);
    const parsed = entered.map(Number);
    if (!Number(distance) || !Number(targetSize) || !parsed.length ||
      parsed.some(value => value < 0 || value > 10)) {
      Alert.alert('Check the entry', 'Enter distance, target size and scores from 0 to 10.');
      return;
    }
    addSession({distance: Number(distance), targetSize: Number(targetSize),
      scores: parsed, conditions: condition, notes: notes.trim(),
      equipmentName: equipmentName || undefined});
    onDone();
  };
  return <Screen keyboard title="Record session"
    subtitle="Enter observed results. Empty arrow fields are ignored.">
    <View style={s.row}><View style={s.flex}><Select
      label="DISTANCE (M)" value={distance} options={distances} onChange={setDistance} /></View>
      <View style={s.flex}><Select
        label="TARGET (CM)" value={targetSize} options={targetSizes}
        onChange={setTargetSize} /></View></View>
    {equipmentProfiles.length ? <Select label="EQUIPMENT" value={equipmentName}
      options={equipmentProfiles.map(item => item.name)} onChange={setEquipmentName} /> : null}
    <Choice label="CONDITIONS" options={conditions} value={condition} onChange={setCondition} />
    <Text style={s.label}>ARROW SCORES (0–10)</Text><View style={s.scoreRow}>
      {scores.map((score, index) => <ScoreSelect key={index} arrow={index + 1}
        value={score} onChange={value => setScores(current =>
          current.map((item, position) => position === index ? value : item))} />)}
    </View>
    <Field label="SESSION NOTES" value={notes} onChangeText={setNotes} multiline />
    <Button title="Save session" onPress={save} /><Button title="Cancel" onPress={onDone} secondary />
  </Screen>;
}

function Select({label, value, options, onChange}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return <View style={s.selectWrap}>
    <Text style={s.label}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={label}
      accessibilityHint="Opens a list of values" style={s.select}
      onPress={() => setOpen(true)}>
      <Text style={s.selectValue}>{value}</Text>
      <Text style={s.chevron}>⌄</Text>
    </Pressable>
    <Modal visible={open} transparent animationType="fade"
      onRequestClose={() => setOpen(false)}>
      <Pressable style={s.modalBackdrop} onPress={() => setOpen(false)}>
        <View style={s.optionSheet}>
          <Text style={s.optionTitle}>{label}</Text>
          <View style={s.optionGrid}>
            {options.map(option => <Pressable key={option}
              accessibilityRole="button"
              style={[s.option, option === value && s.activeOption]}
              onPress={() => { onChange(option); setOpen(false); }}>
              <Text style={[s.optionText, option === value && s.activeOptionText]}>
                {option}
              </Text>
            </Pressable>)}
          </View>
          <Pressable style={s.closeOption} onPress={() => setOpen(false)}>
            <Text style={s.closeOptionText}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  </View>;
}

function ScoreSelect({arrow, value, onChange}: {
  arrow: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return <View style={s.scoreSelectWrap}>
    <Text style={s.arrowNumber}>#{arrow}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={`Arrow ${arrow} score`}
      accessibilityHint="Opens scores from 0 to 10" style={s.scoreSelect}
      onPress={() => setOpen(true)}>
      <Text style={[s.scoreValue, !value && s.emptyScore]}>{value || '—'}</Text>
      <Text style={s.scoreChevron}>⌄</Text>
    </Pressable>
    <Modal visible={open} transparent animationType="fade"
      onRequestClose={() => setOpen(false)}>
      <Pressable style={s.modalBackdrop} onPress={() => setOpen(false)}>
        <View style={s.optionSheet}>
          <Text style={s.optionTitle}>Arrow {arrow} score</Text>
          <View style={s.optionGrid}>
            {scoreOptions.map(option => <Pressable key={option || 'empty'}
              style={[s.scoreOption, option === value && s.activeOption]}
              onPress={() => { onChange(option); setOpen(false); }}>
              <Text style={[s.optionText, option === value && s.activeOptionText]}>
                {option || '—'}
              </Text>
            </Pressable>)}
          </View>
          <Pressable style={s.closeOption} onPress={() => setOpen(false)}>
            <Text style={s.closeOptionText}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  </View>;
}

const s = StyleSheet.create({
  hero: {height: 175, width: '100%', resizeMode: 'contain'},
  row: {flexDirection: 'row', alignItems: 'center', gap: 10}, flex: {flex: 1},
  heading: {color: colors.white, fontSize: 17, fontWeight: '900'},
  muted: {color: colors.muted, lineHeight: 20, marginTop: 6},
  average: {color: colors.orange, fontSize: 28, fontWeight: '900'},
  details: {borderTopColor: colors.line, borderTopWidth: 1, marginTop: 13},
  body: {color: colors.white, marginTop: 11}, delete: {color: '#FF8B84', marginTop: 15},
  label: {color: colors.white, fontSize: 11, fontWeight: '900', marginBottom: 8},
  selectWrap: {marginBottom: 14},
  select: {minHeight: 52, borderRadius: 10, borderColor: colors.line, borderWidth: 1,
    backgroundColor: colors.deep, paddingHorizontal: 13, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between'},
  selectValue: {color: colors.white, fontSize: 16},
  chevron: {color: colors.orange, fontSize: 24, lineHeight: 24},
  modalBackdrop: {flex: 1, backgroundColor: 'rgba(1, 18, 29, 0.72)',
    justifyContent: 'center', padding: 24},
  optionSheet: {backgroundColor: colors.card, borderRadius: 20, padding: 20,
    borderColor: colors.line, borderWidth: 1},
  optionTitle: {color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 16},
  optionGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  option: {minWidth: 64, minHeight: 48, paddingHorizontal: 16, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.deep,
    borderColor: colors.line, borderWidth: 1},
  activeOption: {backgroundColor: colors.orange, borderColor: colors.orange},
  optionText: {color: colors.white, fontSize: 16, fontWeight: '800'},
  activeOptionText: {color: colors.deep},
  closeOption: {alignItems: 'center', paddingTop: 20},
  closeOptionText: {color: colors.muted, fontSize: 16, fontWeight: '800'},
  scoreRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16},
  scoreSelectWrap: {width: '30%', flexGrow: 1},
  arrowNumber: {color: colors.muted, fontSize: 10, fontWeight: '900', marginBottom: 5,
    textAlign: 'center'},
  scoreSelect: {height: 54, borderRadius: 10, borderWidth: 1, borderColor: colors.line,
    backgroundColor: colors.deep, paddingLeft: 12, paddingRight: 8, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between'},
  scoreValue: {color: colors.white, fontSize: 18, fontWeight: '900'},
  emptyScore: {color: colors.muted},
  scoreChevron: {color: colors.orange, fontSize: 20},
  scoreOption: {width: 54, height: 48, borderRadius: 10, alignItems: 'center',
    justifyContent: 'center', backgroundColor: colors.deep, borderColor: colors.line,
    borderWidth: 1},
});
