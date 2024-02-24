import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  formImageUrl: z.string().optional(),
  price: z.string().optional(),
  isFree: z.boolean().optional(),
});

export type formSchemaType = z.infer<typeof formSchema>;
