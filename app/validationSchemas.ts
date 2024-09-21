import { z } from "zod";

export const clientSchema = z.object({
  firstname: z.string().min(1, "Firstname is required").max(255),
  lastname: z.string().min(1, "Lastname is required").max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number is required").max(15),
});
