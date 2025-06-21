import { useEffect, useState } from "react";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(setProducts)
      .finally(() => setLoad(false));
  }, []);

  return (
    <div className="p-6 bg-primary-foreground">
      <h1 className="text font-bold mb-4">Produtos</h1>

      {load && <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, key) => (
          <ProductCard key={key} product={product} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
