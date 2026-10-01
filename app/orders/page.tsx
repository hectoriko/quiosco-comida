"use client"
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'

export default function OrdersPage() {
    const url = '/orders/api'
  const fetcher = () => fetch(url)
    .then(res => res.json())
    .then(data => data)

  const swrOptions = {
    refreshInterval: 1 * 60000,  // Refresh orders every 60 seconds
    revalidateOnFocus: false
  }

  const { 
    data: ordersReady, 
    error, 
    isLoading 
  } = useSWR<OrderWithProducts[]>(url, fetcher, swrOptions)

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar las órdenes</p>

  if (ordersReady) return (
    <>
        <h1 className="text-center mt-20 text-5xl font-black">
            Órdenes listas para recoger
        </h1>

        <Logo />

        { ordersReady.length ?  (
          <div 
            className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10"
          >
            {ordersReady.map(order => 
                <LatestOrderItem 
                    key={order.id} 
                    order={order} 
                />
            )}

          </div>
        ) : <p className="text-center mt-10">
                No hay órdenes listas para recoger
            </p> 
        }
    </>
  )
}