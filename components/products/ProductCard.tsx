// import React from "react";
import AddProductButton from "./AddProductButton";
import { formatCurrency, getImagePath } from "@/src/utils";
// import { Product } from "@prisma/client";
import { Product } from "@/src/generated/prisma/client";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// };

import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image); 
  
  return (
    <div className="border bg-white relative">
        <Image 
            src={imagePath} 
            alt={`Imagen de ${product.name}`}
            // fill
            width={400} 
            height={500}
            quality={80}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatCurrency(product.price)}
            </p>
            <AddProductButton product={product} />
        </div>
    </div>
  );
}