import { AdminStore } from "@/lib/types";


import { Department, User } from "@/lib/types";
import { create } from "zustand";

import { createJSONStorage, persist, } from "zustand/middleware";

export const useAdminStore = create<AdminStore>()(
    persist<AdminStore>(
        (set, get) => ({
            hospitals: {},
            departments: [] as Department[],
            users: [] as User[],
            loading: false,
            setHospitals: (hospitals: Record<string, unknown>) => set({ hospitals }),
            setDepartments: (departments: Department[]) => set({ departments }),
            setUsers: (users: User[]) => set({ users }),
            setLoading: (isLoading: boolean) => set({ loading: isLoading }),

            addDepartment: (department: Department) => {
                const currentDepartments = get().departments;
                set({ departments: [...currentDepartments, department] });
            },
            deleteDepartment: (departmentId: string) => {
                const currentDepartments = get().departments;
                set({ departments: currentDepartments.filter(department => department.id !== departmentId) });
            },
            addStaffToDepartment: (departmentId: string, staff: User) => {
                const currentDepartments = get().departments;
                const updatedDepartments = currentDepartments.map(department => ({
                    ...department,
                    users: department.id === departmentId ? [...(department.users || []), staff] : department.users
                }));
                set({ departments: updatedDepartments });
            },
            deleteStaffFromDepartment: (departmentId: string, staffId: string) => {
                const currentDepartments = get().departments;
                set({ departments: currentDepartments.map(department => ({
                    ...department, users: department.id === departmentId ? department.users?.filter(user => user.id !== staffId) : department.users
                })) });
            },
            oxygenConsumptionData: {} as any[],
            setOxygenConsumptionData: (data: any) => set({ oxygenConsumptionData: data }),

        }),
        {
            name: "admin-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useAdminStore;
