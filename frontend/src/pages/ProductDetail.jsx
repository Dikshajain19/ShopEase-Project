import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CardContext";
const ProductDetail = () => {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {addToCart}=useCart()

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>No product found</div>;
  }
  return (
    <div>
     
        <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-50 to-fuchsia-100 p-8">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* LEFT: Image */}
              <div className="flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-125 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* RIGHT: Details */}
              
              <div className="flex flex-col justify-center">
                {/* Category */}
                <span className="text-2xl text-pink-600 underline mb-2">
                    <a href="/"> Back to Home</a>
                  </span>
                
 
                <span className="mb-3 inline-block w-fit rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
                  {product.category?.name}
                </span>

                {/* Name */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>

                {/* Divider */}
                <div className="h-1 w-20 rounded-full bg-linear-to-r from-pink-400 to-fuchsia-500 mb-6" />

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {product.description ||
                    "No description available for this product."}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-sm uppercase tracking-wide text-gray-500">
                    Price
                  </span>
                  <p className="text-3xl font-bold text-fuchsia-600">
                    ₹{product.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="rounded-2xl bg-linear-to-r from-pink-400 to-fuchsia-500 px-6 py-3 text-white font-semibold shadow-md transition hover:scale-105">
                    Buy Now
                  </button>

                  <button onClick={()=>addToCart(product)} className="rounded-2xl border-2 border-pink-300 px-6 py-3 font-semibold text-pink-600 transition hover:bg-pink-50">
                    Add to Cart
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default ProductDetail;
