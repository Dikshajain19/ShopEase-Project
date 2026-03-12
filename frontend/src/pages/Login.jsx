import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../util/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${BASE}api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        saveTokens(data);
        setMsg("Login successful!");
        setTimeout(() => nav("/"), 800);
      } else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-pink-50">
      
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
        
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Welcome Back 💖
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            required
            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        {msg && (
          <p className="mt-4 text-center text-sm text-gray-600">{msg}</p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-pink-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </div>

      </div>

    </div>
  );
}

export default Login;