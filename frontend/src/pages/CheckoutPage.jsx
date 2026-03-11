import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASEURL}api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Order Placed Successfully!");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to place order");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-fuchsia-200 p-6">
      
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Checkout 💕
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="CreditCard">Card</option>
              <option value="upi">UPI / Net Banking</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-lg"
          >
            {loading ? "Processing..." : "Place Order 💖"}
          </button>

          {message && (
            <p className="text-center text-sm text-pink-600 mt-3">
              {message}
            </p>
          )}

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;