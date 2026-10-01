import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string()
            .min(2, "El nombre es requerido"),
    total: z.number()
            .min(1, "El total debe ser mayor que cero"),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    })).min(1, "El pedido debe contener al menos un producto"),
});

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => !isNaN(val), {
            message: "El ID de la orden debe ser un número válido"
        })
});

export const SearchSchema = z.object({
    search: z.string()
                .trim()
                .min(1, "El término de búsqueda es requerido")
})


export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string()
        .trim()
        .min(1, { message: 'La imagen del producto es obligatoria' })
})
