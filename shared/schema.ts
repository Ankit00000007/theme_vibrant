import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().url(),
  category: z.string(),
  productId: z.number()
});

export type Product = z.infer<typeof productSchema>;

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1)
});

export type CartItem = Product & {
  quantity: number;
};

export const cartSumSchema = z.object({
  total_sub: z.number(),
  total_grand: z.number(),
  total_gst: z.number(),
  total_qty: z.number(),
  total_bv: z.number(),
  courier_charge: z.number()
});

export type CartSum = z.infer<typeof cartSumSchema>;