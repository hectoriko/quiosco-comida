import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
    order: OrderWithProducts
}
    
export default function LatestOrderItem({ order }: LatestOrderItemProps) {
    return (
        <div className="bg-white shadow p-5 space-y-5 rounded-lg">
            <div className="flex justify-between">
                <p className="text-lg font-bold text-slate-600">
                    Cliente: {order.name}
                </p>

                <p className="text-lg font-bold text-amber-400">#{order.id}</p>
            </div>
            
            <ul
                className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                role="list"
            >
                {order.orderProducts.map(prod => (
                    <li 
                        key={prod.id}
                        className="flex gap-2 py-4 text-m"
                    >
                        <span 
                            className='flex flex-col items-center justify-center bg-indigo-500 rounded p-1 w-6 h-6 text-sm text-white font-bold'>
                            {prod.quantity}
                        </span>
                        <p>
                            {prod.product.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}