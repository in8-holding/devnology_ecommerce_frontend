import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

type CheckoutData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutData) => {
    const res = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, products: cart }),
    });

    if (res.ok) {
      clearCart();
      navigate("/orders");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Finalizar Compra</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input {...register("name")} placeholder="Nome" className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar Pedido
        </button>
      </form>
    </div>
  );
}