import { useCart } from "../context/CartContext";
import React from "react";

export default function CartPage() {
  const { cartItems,total, removeFromCart, updateItems } = useCart();
  const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL;
  console.log(cartItems)

 

  return (
    <div className="min-h-screen bg-linjear-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          🛍 Your Cart
        </h1>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart feels lonely. Add something cute 💖
          </p>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                >
                  <img
                    src={`${BASEURL}${item.product_image}`}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded-xl border"
                  />
                  {/* Product Info */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product_name}
                    </h2>
                    <p className="text-pink-500 font-medium">
                      ₹ {item.product_price}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateItems(item.id, item.quantity - 1)
                      }
                      className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-3 py-1 rounded-full font-bold transition"
                    >
                      −
                    </button>

                    <span className="font-semibold text-gray-700">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateItems(item.id, item.quantity + 1)
                      }
                      className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-3 py-1 rounded-full font-bold transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-rose-400 hover:bg-rose-500 text-white px-3 py-1 rounded-full transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-10 border-t pt-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Total
              </h2>
              <span className="text-2xl font-bold text-pink-600">
                ₹ {total}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="mt-6 text-center">
              <button className="bg-linear-to-r from-pink-400 to-fuchsia-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
                Proceed to Checkout ✨
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
