import {z} from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(16, "Password must not cross 16 characters"),

  
});
export type LoginSchema = z.infer<typeof loginSchema>;