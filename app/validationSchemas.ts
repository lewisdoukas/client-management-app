import { z } from "zod";

export const clientSchema = z.object({
  firstname: z.string().min(1, "Firstname is required").max(255),
  lastname: z.string().min(1, "Lastname is required").max(255),
  phoneNumber: z.string().min(10, "Phone number is required").max(10),
  email: z.string().email().optional().nullable(),
  address: z.string().max(255).optional().nullable(),
});

export const caseSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});
