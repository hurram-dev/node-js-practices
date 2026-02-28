import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    id: z.string().min(1, 'ID is required'),
})

export type ProductEntity = z.infer<typeof productSchema>;