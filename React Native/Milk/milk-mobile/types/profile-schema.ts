import * as z from "zod"

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "The name must contain at least 2 characters")
    .max(50, "Name is too long"),
  lastName: z
    .string()
    .min(2, "The last name must contain at least 2 characters")
    .max(50, "The last name is too long"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;