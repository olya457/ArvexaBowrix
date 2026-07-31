export type BowType = 'Recurve' | 'Compound' | 'Longbow' | 'Traditional';
export type Equipment = {
  id: string; name: string; bowType: BowType; drawWeight: number; drawLength: number;
  arrowSpine: number; arrowLength: number; notes: string;
};
export type Session = {
  id: string; createdAt: string; distance: number; targetSize: number;
  scores: number[]; conditions: string; notes: string; equipmentName?: string;
};
export type LedgerData = {equipmentProfiles: Equipment[]; sessions: Session[]};
export const initialData: LedgerData = {
  equipmentProfiles: [],
  sessions: [],
};
