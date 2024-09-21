import { z } from "zod";

export const clientSchema = z.object({
  firstname: z.string().min(1, "Firstname is required").max(255),
  lastname: z.string().min(1, "Lastname is required").max(255),
  phoneNumber: z.string().min(10, "Phone number is required").max(10),
  email: z.string().email().optional().nullable(),
  address: z.string().max(255).optional().nullable(),
});
