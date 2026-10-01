import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTables";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: { 
      category: true, 
    }
  });

  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function CreateProductPage({searchParams} : {
  searchParams: { page: string }
}) {
  
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 20;

  if (page < 0) redirect(`/admin/products`);

  // const productsData = await getProducts(page, pageSize);
  // const countData = await productCount();
  
  const productsData = getProducts(page, pageSize);
  const countData = productCount();

  const [products, count] = await Promise.all([
    productsData,
    countData
  ]);

  const totalPages = Math.ceil(count / pageSize);

  if (page > totalPages) redirect(`/admin/products?page=${totalPages}`);

  return (
    <>
      <Heading>Administrar productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link 
          href={`/admin/products/new`}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />
      
      <ProductsPagination 
        page={page} 
        // count={count} 
        totalPages={totalPages} 
      />
    </>

  );
}
