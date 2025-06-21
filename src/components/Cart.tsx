import type { CartItem } from "../types";

interface Props {
  cart: CartItem[];
  onRemove: (id: string) => void;
}

export default function Cart({ cart, onRemove }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Carrinho</h2>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between mt-2">
          <span>{item.name} (x{item.quantity})</span>
          <button onClick={() => onRemove(item.id)} className="text-red-600">Remover</button>
        </div>
      ))}
    </div>
  );
}