import { OxygenEntry, StaffStore, DailyOxygenConsumption } from "@/lib/types";


import { Department } from "@/lib/types";
import { create } from "zustand";

import { createJSONStorage, persist, } from "zustand/middleware";

export const useStaffStore = create<StaffStore>()(
    persist<StaffStore>(
        (set, get) => ({

            loading: true,
            department: {} as Department,
            setDepartment: (department: Department) => set({ department }),
            hospital: {} as any,
            setHospital: (hospital: any) => set({ hospital }),
            dailyOxygenConsumption: {} as DailyOxygenConsumption,
            setDailyOxygenConsumption: (dailyOxygenConsumption: DailyOxygenConsumption) => set({ dailyOxygenConsumption }),
            updateDailyOxygenConsumption: (entry: OxygenEntry, type: "add" | "subtract") => {
                
                const currentDailyOxygenConsumption = get().dailyOxygenConsumption;
                console.log("entry: ", entry);
                console.log("currentDailyOxygenConsumption: ", currentDailyOxygenConsumption);
                console.log("type: ", type);
                if (type === "add" && entry.is_first_time_usage) {  // if first time usage add to total consumption
                    set({ dailyOxygenConsumption: { ...currentDailyOxygenConsumption, patients_count: (currentDailyOxygenConsumption.patients_count ?? 0) + 1, total_consumption: (currentDailyOxygenConsumption.total_consumption ?? 0)  + (entry.oxygen_consumption ?? 0) } })
                } else if (type === "subtract" && entry.is_first_time_usage) { // if not first time usage subtract from total consumption
                    set({ dailyOxygenConsumption: { ...currentDailyOxygenConsumption, patients_count: (currentDailyOxygenConsumption.patients_count ?? 0) - 1   , total_consumption: (currentDailyOxygenConsumption.total_consumption ?? 0) - (entry.oxygen_consumption ?? 0) } })
                } else if (type === "add" && !entry.is_first_time_usage) { // if not first time usage add to total consumption
                    set({ dailyOxygenConsumption: { ...currentDailyOxygenConsumption, total_consumption: (currentDailyOxygenConsumption.total_consumption ?? 0)  + (entry.oxygen_consumption ?? 0) } })
                } else if (type === "subtract" && !entry.is_first_time_usage) { // if not first time usage subtract from total consumption
                    set({ dailyOxygenConsumption: { ...currentDailyOxygenConsumption, total_consumption: (currentDailyOxygenConsumption.total_consumption ?? 0) - (entry.oxygen_consumption ?? 0) } })
                }
               
            },

            setLoading: (loading: boolean) => set({ loading }),
            oxygenEntries: [] as OxygenEntry[],

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
            name: "staff-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useStaffStore;
