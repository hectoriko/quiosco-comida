import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductsTables";
import ProductSearchForm from "@/components/products/ProductSearchForm";


async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}
export default async function SearchPage({searchParams}: {
    searchParams: {search?: string}
}) {
    console.log('👀 Search:', searchParams.search)

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultados de búsqueda: {' '}
                <span className="bg-amber-300 p-1 rounded">{searchParams.search}</span>
            </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable products={products} />
            ) : (
                <p className="text-center text-gray-500">No se encontraron productos.</p>
            )}
        </>
    )
}