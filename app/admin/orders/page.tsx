'use client';

import useSWR from 'swr'
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types';
// import { prisma } from '@/src/lib/prisma'
// import { revalidatePath } from 'next/cache'

export default function OrdersPage() {
  // const pendingOrders = await getPendingOrders()

  // const refreshOrders = async () => {
  //   'use server'
  //   revalidatePath('/admin/orders')
  // }

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url)
    .then(res => res.json())
    .then(data => data)

  const swrOptions = {
    refreshInterval: 1 * 60000,  // Refresh orders every 60 seconds
    revalidateOnFocus: false
  }

  const { 
    data: pendingOrders, 
    error, 
    isLoading 
  } = useSWR<OrderWithProducts[]>(url, fetcher, swrOptions)

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar las órdenes</p>

  if (pendingOrders) return (
    <>
      <Heading>Administrar órdenes</Heading>
      
      {/* <form
        action={refreshOrders}
      >  
        <input 
          type="submit" 
          value="Actualizar pedidos" 
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        />
      </form> */}
      
      { pendingOrders.length ? ( 
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {pendingOrders.map(order => (
            <OrderCard 
              key={order.id}
              order={order} 
            />
          ))}
        </div>) 
        : (
          <p className="text-center text-gray-500">No hay órdenes pendientes</p>
        )
      }
    </>
  )
}
