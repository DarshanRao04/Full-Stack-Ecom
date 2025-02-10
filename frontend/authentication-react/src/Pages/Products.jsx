"use client"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import {Link} from "react-router-dom"
import { getProducts } from "../api/auth"

export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  async function getProductsTwo() {
    const response = await getProducts()
    setAllProducts(response.products)
    setFilteredProducts(response.products)
  }

  useEffect(() => {
    getProductsTwo()
  }, []) // This hook does not specify all of its dependencies: getProductsTwo

  const handleSearch = (event) => {
    const term = event.target.value
    setSearchTerm(term)

    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {false && (
              <Link
                href="/products/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[400px]">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              </div>
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

