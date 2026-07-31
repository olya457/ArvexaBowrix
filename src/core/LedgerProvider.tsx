import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {initialData, type Equipment, type LedgerData, type Session} from './models';

const key = '@range-ledger/data-v1';
type Value = LedgerData & {
  ready: boolean;
  addSession: (item: Omit<Session, 'id' | 'createdAt'>) => void;
  deleteSession: (id: string) => void;
  saveEquipment: (item: Equipment) => void;
  deleteEquipment: (id: string) => void;
};
const Context = createContext<Value | null>(null);

export function LedgerProvider({children}: {children: React.ReactNode}) {
  const [data, setData] = useState(initialData);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value) {
        const stored = JSON.parse(value) as LedgerData & {equipment?: Omit<Equipment, 'id'>};
        const legacyProfile = stored.equipment?.name ? [{
          ...stored.equipment,
          id: `equipment-${Date.now()}`,
          name: stored.equipment.name === 'Primary bow' ? 'My bow' : stored.equipment.name,
        }] : [];
        setData({
          sessions: stored.sessions ?? [],
          equipmentProfiles: stored.equipmentProfiles ?? legacyProfile,
        });
      }
    }).catch(() => undefined).finally(() => setReady(true));
  }, []);
  const update = (change: (current: LedgerData) => LedgerData) => {
    setData(current => {
      const next = change(current);
      AsyncStorage.setItem(key, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  };
  const value = useMemo<Value>(() => ({
    ...data, ready,
    addSession: item => update(current => ({...current, sessions: [{
      ...item, id: `${Date.now()}-${Math.random()}`, createdAt: new Date().toISOString(),
    }, ...current.sessions]})),
    deleteSession: id => update(current => ({
      ...current, sessions: current.sessions.filter(item => item.id !== id),
    })),
    saveEquipment: equipment => update(current => ({
      ...current,
      equipmentProfiles: current.equipmentProfiles.some(item => item.id === equipment.id)
        ? current.equipmentProfiles.map(item => item.id === equipment.id ? equipment : item)
        : [equipment, ...current.equipmentProfiles],
    })),
    deleteEquipment: id => update(current => ({
      ...current,
      equipmentProfiles: current.equipmentProfiles.filter(item => item.id !== id),
    })),
  }), [data, ready]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useLedger() {
  const value = useContext(Context);
  if (!value) { throw new Error('LedgerProvider is missing'); }
  return value;
}
