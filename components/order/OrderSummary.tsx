'use client';
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useStore } from "@/src/store";
import OrderProductDetails from "./OrderProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";

export default function OrderSummary() {

  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order
    }

    const result = OrderSchema.safeParse(data);
    console.log('🚀 ~ result:', result)

    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    // console.log('🚀 ~ response:', response)
    if (response?.errors) {
      response.errors.forEach( error => { 
        toast.error(error.message);
      });
    }

    toast.success("Pedido creado con éxito");
    clearOrder();
  };

  return (
    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      
      {
        order.length === 0 ? (
          <p
            className="text-center my-10"  
          >No hay productos en el pedido</p>
        ) : (
          <div className="mt-5">
            {order.map((item) => (
              <OrderProductDetails 
                key={item.id + item.name}
                item={item}
              />
            ))}
            <p className="text-2xl mt-20 text-center">
              Total: {formatCurrency(total)}
            </p>

            <form
              className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            > 
              <input 
                type="text" 
                placeholder="Nombre" 
                className="bg-white border border-gray-100 p-2 w-full" 
                name="name" />

              <input
                type="submit"
                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                value="Confirmar pedido"
              />
            </form>
          </div>
        ) 
      }
    </aside>

  );
}
