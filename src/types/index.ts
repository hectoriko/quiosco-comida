// import { Product } from "@prisma/client";
import { Order, Product } from "@/src/generated/prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price" | "image"> & {
    quantity: number
    subtotal: number
};

export type OrderWithProducts = Order & {
    orderProducts: (OrderWithProducts & {
        product: Product
    })[]
}