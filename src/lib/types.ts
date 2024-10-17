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