import { useEffect, useState } from "react";
import type { Order } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="p-6 bg-primary-foreground min-h-screen">
      <h1 className="text-base mb-4">Pedidos</h1>
      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl p-4 shadow relative">
            <p><strong>{order.name}</strong> - {order.email}</p>
            <ul className="list-disc pl-6">
              {order.products.map(p => (
                <li key={p.id}>{p.name} x{p.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}