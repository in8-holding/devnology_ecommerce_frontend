import { useState } from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  const [showMessage, setShowMessage] = useState(false);

  function handleAdd() {
    onAdd(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // oculta após 3 segundos
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow relative">
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/1*KtVnpUxvBzCActwcctDYIA.png"
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="font-semibold text-sm mt-2">{product.name}</h2>
      <p className="font-light text-sm line-clamp-2 text-zinc-600">
        {product.description}
      </p>
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm font-light">Preço</span>
          <p>R$ {product.price},00</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
        >
          Adicionar
        </button>
      </div>

      {showMessage && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded shadow">
          Produto adicionado ao carrinho!
        </div>
      )}
    </div>
  );
}
