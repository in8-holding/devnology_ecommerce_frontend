import type { CartItem } from "../types";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";


interface AsideCartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

export default function AsideCart({ cart, onRemove, onClose }: AsideCartProps) {
  return (
    <motion.aside
      key="cart"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l border-gray-200 z-40 flex flex-col"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Seu Carrinho</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <FaXmark size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length == 0 ? (
          <p className="text-gray-500">Carrinho vazio</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                <p className="text-sm text-gray-600">R$ {item.price}</p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="bg-red-500 text-white hover:underline text-sm h-6 w-6 flex items-center justify-center rounded"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <Link
            to="/checkout"
            className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            onClick={onClose}
          >
            Finalizar Pedido
          </Link>
        </div>
      )}
    </motion.aside>
  );
}
