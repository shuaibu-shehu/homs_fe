import z from 'zod'


export const FormSchema = z.object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z.string().describe('Password').min(1, 'Password is required'),
    code: z.optional(z.string()),
  });


  export const HospitalOnboardingFormSchema = z.object({
    name: z.string().describe('Name').min(5, 'Name must be at least 5 characters long.'),
    contactEmail: z.string().describe('Email').email({ message: 'Invalid Email' }),
    contactPhone: z.string().describe('Contact Phone').min(10, 'Contact Phone must be at least 10 characters long.'),
    address: z.string().describe('Address').optional(),
  });
  



export const SignUpFormSchema = z
.object({
  name: z.string().describe('Name').min(1, 'Name is required'),
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z
    .string()
    .describe('Password')
    .min(6, 'Password must be minimum 6 characters'),
  confirmPassword: z
    .string()
    .describe('Confirm Password')
    .min(6, 'Password must be minimum 6 characters'),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});



export const LoginFormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(1, 'Password is required'),
});



export const HospitalOnboardingSchema = z.object({
  hospitalName: z
    .string()
    .min(1, { message: "Hospital name is required" })
    .max(100, { message: "Hospital name should be 100 characters or less" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(200, { message: "Address should be 200 characters or less" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  contactPerson: z
    .string()
    .min(1, { message: "Contact person is required" })
    .max(50, { message: "Contact person should be 50 characters or less" }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(15, { message: "Contact number should be 15 digits or less" })
    .regex(/^\d+$/, { message: "Contact number should contain only digits" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});


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