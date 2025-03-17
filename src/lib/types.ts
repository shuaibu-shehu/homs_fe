// import {measureMemory} from "vm"
import z from "zod"

export const FormSchema = z.object({
  email: z.string().describe("Email").email({message: "Invalid Email"}),
  password: z.string().describe("Password").min(1, "Password is required"),
  code: z.optional(z.string()),
})

export const HospitalOnboardingFormSchema = z.object({
  name: z
    .string()
    .describe("Name")
    .min(5, "Name must be at least 5 characters long."),
  contactEmail: z.string().describe("Email").email({message: "Invalid Email"}),
  contactPhone: z
    .string()
    .describe("Contact Phone")
    .min(10, "Contact Phone must be at least 10 characters long."),
  address: z.string().describe("Address").optional(),
}) 

export const SignUpFormSchema = z
  .object({
    name: z.string().describe("Name").min(1, "Name is required"),
    email: z.string().describe("Email").email({message: "Invalid Email"}),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })

export const LoginFormSchema = z.object({
  email: z.string().describe("Email").email({message: "Invalid Email"}),
  password: z.string().describe("Password").min(1, "Password is required"),
})

export const HospitalOnboardingSchema = z.object({
  hospitalName: z
    .string()
    .min(1, {message: "Hospital name is required"})
    .max(100, {message: "Hospital name should be 100 characters or less"}),
  address: z
    .string()
    .min(1, {message: "Address is required"})
    .max(200, {message: "Address should be 200 characters or less"}),
  city: z.string().min(1, {message: "City is required"}),
  country: z.string().min(1, {message: "Country is required"}),
  state: z.string().min(1, {message: "State is required"}),
  contactPerson: z
    .string()
    .min(1, {message: "Contact person is required"})
    .max(50, {message: "Contact person should be 50 characters or less"}),
  contactNumber: z
    .string()
    .min(10, {message: "Contact number must be at least 10 digits"})
    .max(15, {message: "Contact number should be 15 digits or less"})
    .regex(/^\d+$/, {message: "Contact number should contain only digits"}),
  email: z
    .string()
    .min(1, {message: "Email is required"})
    .email({message: "Please enter a valid email address"}),
})

export const ContactFormSchema = z.object({
  email: z
    .string()
    .describe("Email is required")
    .email({message: "Invalid email address"}),
  subject: z
    .string()
    .describe("Subject")
    .min(1, {message: "subject is required"})
    .max(50, {message: "subject should be less than 50 characters"}),
  message: z.string().describe("Message").min(1, {message: "Enter a comment"}),
})

// Combine schemas into one for final validation
// export const HospitalOnboardingSchema = z.object({
//   hospitalName: z.string().min(1, "Hospital name is required"),
//   address: z.string().min(1, "Address is required"),
//   contactPerson: z.string().min(1, "Contact person is required"),
//   contactNumber: z.string().regex(/^\d+$/, "Contact number should contain only digits"),
//   email: z.string().email("Please enter a valid email address"),

// });


export const AddDepartmentSchema = z.object({
  name: z.string().nonempty('Department name is required'),
  status: z.boolean(),
});

export const AddStaffSchema = z.object({
  name: z.string().nonempty("Name is required"),
  role: z.string().nonempty("Role is required"),
  status: z.string().nonempty("Status is required"),
  contact: z.string().nonempty("Contact is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
});


export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  status: string | null;
  contact: string | null;
  verified: boolean;
  role: string;
  hospitalId: string;
  hospital: string | null;
  departmentId: string | null;
  department: string | null;
  createdAt: string;
  updatedAt: string;
}


export type Department = {
  id?: string;
  name?: string;
  hospitalId?: string;
  users?: User[]; // Adjust the type as needed
  staffs?: number;
  patients?: number;
  active?: boolean;
  hospital?: any; // Adjust the type as needed
  createdAt?: string;
  updatedAt?: string;
  status?: boolean;
  beds?: any[];
};


export interface AdminStore {
  hospitals: Record<string, any>;
  departments: Department[];
  users: User[];
  loading: boolean;
  setHospitals: (hospital: any) => void;
  setDepartments: (departments: any) => void;
  setUsers: (users: any) => void;
  setLoading: (isLoading: boolean) => void;
  addDepartment: (department: Department) => void;
  deleteDepartment: (departmentId: string) => void;
  addStaffToDepartment: (departmentId: string, staff: User) => void;
  deleteStaffFromDepartment: (departmentId: string, staffId: string) => void;
  oxygenConsumptionData: any[];
  setOxygenConsumptionData: (data: any[]) => void;
  // ... other properties
};

export interface StaffStore {
  dailyOxygenConsumption : DailyOxygenConsumption;
  setDailyOxygenConsumption: (dailyOxygenConsumption: DailyOxygenConsumption) => void;
  updateDailyOxygenConsumption: (dailyOxygenConsumption: DailyOxygenConsumption, type: "add" | "subtract") => void;
  hospital: Record<string, any>;
  department?: Department;
  loading: boolean;
  setHospital: (hospital: any) => void;
  setDepartment: (department: Department) => void;
  setLoading: (isLoading: boolean) => void;
  oxygenEntries: OxygenEntry[]
  setOxygenEntries: (oxygenEntries: OxygenEntry[]) => void;
  addOxygenEntry: (oxygenEntry: OxygenEntry) => void;
  deleteOxygenEntry: (oxygenEntryId: string) => void;
  editOxygenEntry: (newOxygenEntry: OxygenEntry) => void;
}

export type OxygenEntry = {
  id?: string | number;
  department_id?: string;
  bed_number?: string;
  nurse_id?: string;
  sensor_id?: string | null;
  oxygen_consumption?: number;
  is_first_time_usage?: boolean;
  timestamp?: string;
  remarks?: string;
  daily_oxygen_consumption_id?: string;
};

export interface OxygenStore {
  oxygenEntries: OxygenEntry[];
  setOxygenEntries: (oxygenEntries: OxygenEntry[]) => void;
  addOxygenEntry: (oxygenEntry: OxygenEntry) => void;
  deleteOxygenEntry: (oxygenEntryId: string) => void;
}



export const AddOxygenEntrySchema = z.object({
  totalConsumption: z.number().min(1, "Total oxygen must be at least 1"),
  bedNumber: z.string().min(1, "Bed number is required"),
  isFirstTimeUsage: z.boolean(),
  remarks: z.string(),
});

export interface DailyOxygenConsumption {
  id?: string;
  date?: string;
  department?: null | Department;
  department_id?: string;
  last_updated?: string;
  patients_count?: number;
  total_consumption?: number;
}

export const AddBedSchema = z.object({
  bedNumber: z.number().min(1, "Bed number is required"),
  sensorId: z.string().optional(),
});
