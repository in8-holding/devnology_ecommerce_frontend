import { useEffect, useState } from "react";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-6 bg-primary-foreground">
      <h1 className="text font-bold mb-4">Produtos</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, key) => (
          <ProductCard key={key} product={product} onAdd={addToCart} />
        ))}
      </div>
      <Cart cart={cart} onRemove={removeFromCart} />
      <Link to="/checkout" className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Finalizar Compra
      </Link>
    </div>
  );
}
