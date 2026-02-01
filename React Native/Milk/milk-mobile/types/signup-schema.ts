import * as z from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "The name must contain at least 2 characters")
    .max(50, "Name is too long"),
  lastName: z
    .string()
    .min(2, "The last name must contain at least 2 characters")
    .max(50, "The last name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number")
});

export type SignUpFormData = z.infer<typeof signUpSchema>;