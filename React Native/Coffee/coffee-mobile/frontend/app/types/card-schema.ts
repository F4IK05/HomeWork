import * as z from "zod";

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Номер карты должен содержать 16 цифр")
    .max(16, "Номер карты не может быть длиннее 16 цифр")
    .regex(/^\d+$/, "Номер карты должен состоять только из цифр"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Используйте формат MM/YY"),
  cvv: z
    .string()
    .min(3, "CVV должен содержать 3 цифры")
    .max(3, "CVV не может быть длиннее 3 цифр")
    .regex(/^\d+$/, "CVV должен состоять только из цифр"),
  cardHolder: z
    .string()
    .min(2, "Введите имя владельца (минимум 2 символа)"),
});

export type CardFormData = z.infer<typeof cardSchema> & {
  cardImage?: string | null;
};