import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import AsideCart from "./AsideCart";
import { AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export function Header() {
  const [showCart, setShowCart] = useState(false);
  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-30 py-4 border-b border-gray-200 bg-white">
        <div className="px-4 flex items-center justify-between w-full mx-auto">
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-bold">
              <img src="/logo.svg" className="w-24 md:w-24" />
            </h1>
            <div>
              <Link to="/" className="text-sm text-gray-600 hover:underline">
                Início
              </Link>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li
                className="flex items-center justify-center text-sm font-light transition-colors cursor-pointer"
                onClick={() => navigate("/orders")}
              >
                Histórico de Compras
              </li>
              <li
                className="bg-zinc-200 h-9 w-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setShowCart(prev => !prev)}
              >
                <FaCartShopping />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      

      {/* Cart Aside com animação condicional */}
      <AnimatePresence>
        {showCart && (
          <AsideCart
            cart={cart}
            onRemove={removeFromCart}
            onClose={() => setShowCart(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
