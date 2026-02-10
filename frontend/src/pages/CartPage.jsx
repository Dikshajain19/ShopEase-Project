import { useCart } from "../context/CardContext";

import React from 'react'

export default function CartPage() {
    const {cartItems,removeFromCart,updateItems} = useCart()
    const total= cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0);

  return (
    <div>
     
        <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl overflow-hidden">
            <h1>Your Cart </h1>
          </div>
        </div>
     
    </div>
   
  )
}
