import React, { useEffect , useState} from 'react'
import { allProducts } from '../../api'

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
useEffect(()=>{
    allProducts().then((data)=>{
    
        console.log(data)
        setProducts(data)
    })
    .then(()=>{setLoading(false)})

},[])
if (loading) return <div>Loading products...</div>;
if (error) return <div>Error: {error}</div>;

return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    {products.map((product) => (
      <div key={product.id} className="border rounded-xl p-4 shadow-lg bg-white">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-500 font-bold">${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    ))}
  </div>
);
}
