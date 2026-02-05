import { useState, useEffect } from 'react'
import ProductCard from "../components/ProductCard"

function App() {
  const [products, setProducts] = useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  

  useEffect(() => {
    const BASEURL=import.meta.env.VITE_DJANGO_BASE_URL
    fetch(`${BASEURL}api/products/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      }
    )
      .catch(err => { console.error("Fetch error:", err)
        setLoading(false)}
    )
  }, [])
  
  if(loading){
    return (
        <h1>Still Loading</h1>
    )
  }
  if(error){
    return <div> Error : {error}</div>
  }
  return (
    <div className='min-h-screen bg-linear-to-br from-pink-200 via-rose-100 to-fuchsia-200'>
      <h1 className='text-5xl font-bold  text-fuchsia-600 mb-2 text-center p-3'> Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5  p-5">
        {products.length > 0 ?
          (products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))):(<p>No Products Available</p>)
        }
        
      </div>
      
    </div>
    
  )
}


export default App
