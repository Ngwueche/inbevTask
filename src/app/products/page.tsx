"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import Product from '../types/Product';
import ProductCard from '../components/ProductCard';
import { useCart } from '../utilities/CartContext';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const context = useCart();
 
  const handleAddToCart = (product: Product) => {
    context.updateCart(product); 
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: any = await response.json();
        const limitedData = data.products.slice(0, 20);
        setProducts(limitedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSort = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  return (
<div className=" mx-8 flex flex-col md:flex-row items-center md:items-start">
  {/* Left Sidebar */}
  <div className="w-1/6 p-4 ">
    <h2 className="text-lg font-bold mb-4 text-white">Sort Options</h2>
    <div className="mb-4">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        className="w-full bg-gray-100 px-3 py-2 rounded-md text-black"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <button
      onClick={handleSort}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Sort by Price
    </button>
  </div>
{/* divider */}
<div className=' w-[1px] bg-white mx-4'></div>

  {/* Main Content */}
  <div className="w-3/4 ">
    <div className="my-4 w-full flex justify-center">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-2/4 text-black px-4 py-2 border border-gray-300 rounded-md "
      />
    </div>
      
    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    ) : (
      <p className="text-center mt-8">
        {searchTerm.length > 0 ? "No matching products found" : "Loading products..."}
      </p>
    )}
  </div>
</div>

  );
};

export default ProductsPage;