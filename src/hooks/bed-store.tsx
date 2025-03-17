import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Bed {
  id: string;
  bed_number: number;
  created_at: string;
  updated_at: string;
  oxygen_consumption: number
  daily_consumptions: any | null;
  department: any | null;
  department_id: string;
  sensor_id: string;
  sensor_readings: any | null;
}

export interface BedStore {
  beds: Bed[];
  setBeds: (beds: Bed[]) => void;
  addBed: (bed: Bed) => void;
    removeBed: (bedId: string) => void;
    findBedById: (bedId: string) => Bed | undefined;    
}

export const useBedStore = create<BedStore>()(
  persist(
    (set, get) => ({
      beds: [],
      
      setBeds: (beds) => {
        set({ beds });
      },
      
      addBed: (bed) => {
        set((state) => ({
          beds: [...state.beds, bed]
        }));
      },
      
      removeBed: (bedId) => {
        set((state) => ({
          beds: state.beds.filter((bed) => bed.id !== bedId)
        }));
      },

      findBedById: (bedId) => {
        return get().beds.find((bed) => bed.id === bedId);
      },
    }),
    {
      name: 'bed-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);


