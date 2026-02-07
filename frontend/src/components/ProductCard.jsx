import React from 'react'
import { Link } from 'react-router-dom'
const ProductCard = ({product}) => {
  return (
    <div className="group max-w-sm rounded-3xl bg-linear-to-br from-pink-200 via-rose-100 to-fuchsia-200 p-1 shadow-lg hover:shadow-xl transition">
        <div className="rounded-3xl bg-white/80 backdrop-blur-md overflow-hidden">

            {/* Image */}
            {product.image && (
            <img
                src={product.image}
                alt={product.name}
                className="h-75 w-full object-cover transition group-hover:scale-105"
            />
            )}

            {/* Content */}
            <div className="p-5">
                
            {/* Category */}
            <span className="inline-block mb-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                {product.category?.name}
            </span>

            {/* Name */}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {product.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                {product.description || "No description available"}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-fuchsia-600">
                ₹{product.price}
                </span>

                <Link to={`/product/${product.id}`}>
                    <button className="rounded-xl bg-linear-to-r from-pink-400 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105">
                       View
                    </button>
                </Link>
            </div>

            </div>
        </div>
    </div>


  )
}

export default ProductCard