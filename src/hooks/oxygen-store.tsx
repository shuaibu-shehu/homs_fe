import { OxygenEntry, OxygenStore } from "@/lib/types";

import { create } from "zustand";

import { createJSONStorage, persist, } from "zustand/middleware";

export const useOxygenStore = create<OxygenStore>()(
    persist<OxygenStore>(
        (set, get) => ({
            oxygenEntries: [
                {
                    id: '1',
                    bed_number: '101',
                    oxygen_consumption: 500,
                    remarks: 'Initial supply',
                },
                {
                    id: '2',
                    bed_number: '102',
                    oxygen_consumption: 750,
                    remarks: 'Refilled',
                },
                {
                    id: '3',
                    bed_number: '103',
                    oxygen_consumption: 600,
                    remarks: 'Maintenance check',
                },
            ] as OxygenEntry[],
            
            setOxygenEntries: (oxygenEntries: OxygenEntry[]) => set({ oxygenEntries }),

            addOxygenEntry: (oxygenEntry: OxygenEntry) => {
                const currentOxygenEntries = get().oxygenEntries;
                set({ oxygenEntries: [...currentOxygenEntries, oxygenEntry] });
            },
            deleteOxygenEntry: (oxygenEntryId: string) => {
                const currentOxygenEntries = get().oxygenEntries;
                set({ oxygenEntries: currentOxygenEntries.filter((oxygenEntry: OxygenEntry) => oxygenEntry.id !== oxygenEntryId) });
            },
            editOxygenEntry: (newOxygenEntry: OxygenEntry) => {
                const currentOxygenEntries = get().oxygenEntries;
                set({ oxygenEntries: currentOxygenEntries.map((oxygenEntry: OxygenEntry) => oxygenEntry.id === newOxygenEntry.id ? newOxygenEntry : oxygenEntry) });
            }
        }),
        {
            name: "nurse-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useOxygenStore;
    