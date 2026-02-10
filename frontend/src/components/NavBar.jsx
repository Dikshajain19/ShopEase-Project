import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CardContext'

const NavBar = () => {
  const cartItems=useCart();
  const cartCount=cartItems.reduce((total,item)=>total+item.quantity)
  return (
      <nav className="sticky top-0 z-50 bg-linear-to-r from-pink-400 via-rose-400 to-fuchsia-500 shadow-lg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-white"
          >
            Pink<span className="text-pink-100">Store</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white font-medium hover:scale-105 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white font-medium hover:scale-105 transition"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-white font-medium hover:scale-105 transition"
            >
              Cart
              {cartCount>0 && (
                <span>{cartCount}</span>
              )}
            </Link>
            <Link
              to="/login"
              className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow-md hover:scale-105 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-linear-to-br from-pink-300 via-rose-300 to-fuchsia-400 px-6 py-4 space-y-4 shadow-inner">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block text-white font-medium"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="block text-white font-medium"
          >
            Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block text-white font-medium"
          >
            Cart
          </Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block rounded-xl bg-white/90 px-4 py-2 text-center font-semibold text-pink-600"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar


  

