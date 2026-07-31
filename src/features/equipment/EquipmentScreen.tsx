import React, {useState} from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {appAssets} from '../../assets/images';
import {useLedger} from '../../core/LedgerProvider';
import type {BowType, Equipment} from '../../core/models';
import {Button, Card, Field, Screen} from '../../shared/ui';
import {colors} from '../../theme/colors';

const bowTypes: BowType[] = ['Recurve', 'Compound', 'Longbow', 'Traditional'];
const drawWeights = ['15', '20', '25', '28', '30', '32', '35', '40', '45', '50', '55',
  '60', '65', '70'];
const drawLengths = Array.from({length: 15}, (_, index) => `${20 + index}`);
const arrowSpines = ['250', '300', '340', '400', '500', '600', '700', '800', '900', '1000'];
const arrowLengths = Array.from({length: 13}, (_, index) => `${22 + index}`);

const blankEquipment = (): Equipment => ({
  id: `equipment-${Date.now()}-${Math.random()}`,
  name: '',
  bowType: 'Recurve',
  drawWeight: 32,
  drawLength: 28,
  arrowSpine: 600,
  arrowLength: 29,
  notes: '',
});

export function EquipmentScreen() {
  const {equipmentProfiles, saveEquipment, deleteEquipment} = useLedger();
  const [draft, setDraft] = useState<Equipment | null>(null);
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!draft?.name.trim() || !draft.drawWeight || !draft.drawLength ||
      !draft.arrowSpine || !draft.arrowLength) {
      Alert.alert('Check equipment', 'Complete the profile name and all equipment values.');
      return;
    }
    saveEquipment({...draft, name: draft.name.trim()});
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setDraft(null);
    }, 900);
  };

  if (!draft) {
    return <Screen title="Equipment profiles"
      subtitle="Save separate bow and arrow setups for different kinds of practice.">
      <Image source={appAssets.bowSetupHero} style={s.hero} />
      <Button title="＋ Add equipment" onPress={() => setDraft(blankEquipment())} />
      {!equipmentProfiles.length ? <Card>
        <Text style={s.emptyTitle}>No equipment profiles yet</Text>
        <Text style={s.muted}>Add your first setup. You can create and edit more profiles later.</Text>
      </Card> : equipmentProfiles.map(item => <Pressable key={item.id}
        onPress={() => setDraft({...item})}>
        <Card>
          <View style={s.profileHeader}>
            <View style={s.flex}>
              <Text style={s.profileName}>{item.name}</Text>
              <Text style={s.muted}>{item.bowType} · {item.drawWeight} lb · {item.drawLength} in</Text>
              <Text style={s.profileMeta}>Spine {item.arrowSpine} · Arrow {item.arrowLength} in</Text>
            </View>
            <Text style={s.editIcon}>✏️</Text>
          </View>
        </Card>
      </Pressable>)}
    </Screen>;
  }

  return <Screen keyboard title={equipmentProfiles.some(item => item.id === draft.id)
    ? 'Edit equipment' : 'New equipment'}
    subtitle="Choose a suggested value or add your own.">
    <Field label="PROFILE NAME" value={draft.name}
      onChangeText={name => setDraft(current => current ? {...current, name} : current)} />
    <EquipmentSelect label="BOW TYPE" value={draft.bowType} options={bowTypes}
      onChange={value => setDraft(current => current
        ? {...current, bowType: value as BowType} : current)} />
    <View style={s.row}>
      <View style={s.flex}><EquipmentSelect label="DRAW WEIGHT (LB)"
        value={`${draft.drawWeight}`} options={drawWeights} custom
        onChange={value => setDraft(current => current
          ? {...current, drawWeight: Number(value)} : current)} /></View>
      <View style={s.flex}><EquipmentSelect label="DRAW LENGTH (IN)"
        value={`${draft.drawLength}`} options={drawLengths} custom
        onChange={value => setDraft(current => current
          ? {...current, drawLength: Number(value)} : current)} /></View>
    </View>
    <View style={s.row}>
      <View style={s.flex}><EquipmentSelect label="ARROW SPINE"
        value={`${draft.arrowSpine}`} options={arrowSpines} custom
        onChange={value => setDraft(current => current
          ? {...current, arrowSpine: Number(value)} : current)} /></View>
      <View style={s.flex}><EquipmentSelect label="ARROW LENGTH (IN)"
        value={`${draft.arrowLength}`} options={arrowLengths} custom
        onChange={value => setDraft(current => current
          ? {...current, arrowLength: Number(value)} : current)} /></View>
    </View>
    <Field label="TUNING NOTES" value={draft.notes}
      onChangeText={notes => setDraft(current => current ? {...current, notes} : current)}
      multiline />
    <Button title={saved ? '✓ Equipment saved' : 'Save equipment'} onPress={save} />
    <Button title="Cancel" onPress={() => setDraft(null)} secondary />
    {equipmentProfiles.some(item => item.id === draft.id) ? <Pressable
      style={s.deleteButton} onPress={() => Alert.alert('Delete equipment?',
        `Remove “${draft.name}” from your profiles?`, [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', style: 'destructive', onPress: () => {
            deleteEquipment(draft.id);
            setDraft(null);
          }},
        ])}>
      <Text style={s.deleteText}>Delete equipment</Text>
    </Pressable> : null}
  </Screen>;
}

function EquipmentSelect({label, value, options, onChange, custom}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  custom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const close = () => {
    setOpen(false);
    setCustomMode(false);
    setCustomValue('');
  };
  const addCustom = () => {
    const numeric = Number(customValue);
    if (!numeric || numeric <= 0) {
      Alert.alert('Check value', 'Enter a number greater than zero.');
      return;
    }
    onChange(`${numeric}`);
    close();
  };
  return <View style={s.selectWrap}>
    <Text style={s.label}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={label}
      accessibilityHint="Opens a list of values" style={s.select}
      onPress={() => setOpen(true)}>
      <Text style={s.selectValue}>{value}</Text>
      <Text style={s.chevron}>⌄</Text>
    </Pressable>
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable style={s.backdrop} onPress={close}>
        <View style={s.sheet}>
          <Text style={s.sheetTitle}>{label}</Text>
          {customMode ? <>
            <TextInput autoFocus keyboardType="decimal-pad" value={customValue}
              onChangeText={text => setCustomValue(text.replace(/[^0-9.]/g, ''))}
              placeholder="Enter your value" placeholderTextColor={colors.muted}
              style={s.customInput} />
            <Button title="Add value" onPress={addCustom} />
          </> : <View style={s.options}>
            {options.map(option => <Pressable key={option}
              style={[s.option, option === value && s.activeOption]}
              onPress={() => { onChange(option); close(); }}>
              <Text style={[s.optionText, option === value && s.activeOptionText]}>
                {option}
              </Text>
            </Pressable>)}
            {custom ? <Pressable style={s.customOption} onPress={() => setCustomMode(true)}>
              <Text style={s.customOptionText}>＋ Custom</Text>
            </Pressable> : null}
          </View>}
          <Pressable style={s.cancel} onPress={close}>
            <Text style={s.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  </View>;
}

const s = StyleSheet.create({
  hero: {height: 180, width: '100%', resizeMode: 'contain'},
  row: {flexDirection: 'row', gap: 10},
  flex: {flex: 1},
  emptyTitle: {color: colors.white, fontSize: 17, fontWeight: '900'},
  muted: {color: colors.muted, lineHeight: 20, marginTop: 5},
  profileHeader: {flexDirection: 'row', alignItems: 'center'},
  profileName: {color: colors.white, fontSize: 19, fontWeight: '900'},
  profileMeta: {color: colors.orange, fontSize: 12, fontWeight: '800', marginTop: 7},
  editIcon: {fontSize: 20, marginLeft: 12},
  deleteButton: {alignItems: 'center', paddingVertical: 16},
  deleteText: {color: '#FF8B84', fontSize: 15, fontWeight: '800'},
  selectWrap: {marginBottom: 14},
  label: {color: colors.white, fontSize: 11, fontWeight: '900', letterSpacing: 1.1,
    marginBottom: 8},
  select: {minHeight: 52, borderRadius: 10, borderColor: colors.line, borderWidth: 1,
    backgroundColor: colors.deep, paddingHorizontal: 13, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between'},
  selectValue: {color: colors.white, fontSize: 16, flexShrink: 1},
  chevron: {color: colors.orange, fontSize: 24},
  backdrop: {flex: 1, backgroundColor: 'rgba(1, 18, 29, 0.72)',
    justifyContent: 'center', padding: 24},
  sheet: {backgroundColor: colors.card, borderColor: colors.line, borderWidth: 1,
    borderRadius: 20, padding: 20},
  sheetTitle: {color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 16},
  options: {flexDirection: 'row', flexWrap: 'wrap', gap: 9},
  option: {minWidth: 58, minHeight: 46, paddingHorizontal: 12, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.deep,
    borderColor: colors.line, borderWidth: 1},
  activeOption: {backgroundColor: colors.orange, borderColor: colors.orange},
  optionText: {color: colors.white, fontSize: 15, fontWeight: '800'},
  activeOptionText: {color: colors.deep},
  customOption: {minHeight: 46, paddingHorizontal: 15, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', borderColor: colors.orange,
    borderWidth: 1},
  customOptionText: {color: colors.orange, fontSize: 15, fontWeight: '900'},
  customInput: {minHeight: 54, borderRadius: 10, borderColor: colors.line, borderWidth: 1,
    backgroundColor: colors.deep, color: colors.white, fontSize: 18, paddingHorizontal: 14},
  cancel: {alignItems: 'center', paddingTop: 20},
  cancelText: {color: colors.muted, fontSize: 16, fontWeight: '800'},
});
