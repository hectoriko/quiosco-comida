import AddProductForm from "@/components/products/AddProductForm";
import Heading from "@/components/ui/Heading";
import ProductForm from "@/components/products/ProductForm";

export default function ProductsPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      {/* <AddProductForm /> */}

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
