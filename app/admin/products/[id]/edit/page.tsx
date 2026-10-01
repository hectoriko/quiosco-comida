import { prisma } from '@/src/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import GoBackButton from '@/components/ui/GoBackButton';

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: { id }
    });

    // if (!product) redirect('/404');
    if (!product) notFound();
    
    return product;
}

export default async function EditProductsPage({params}: {
    params: {id: string}
}) {
    
    const { id } = params;
    const product = await getProductById(Number(id));

    return (
        <div>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm>
                <ProductForm 
                    product={product} 
                />
            </EditProductForm>
        </div>
    );
}