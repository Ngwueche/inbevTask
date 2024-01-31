"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import Product from '../types/Product';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [cart, setCart] = useState<Product[]>([]);


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
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const totalItemsInCart = cart.length;

  return (
    <div className="container mx-auto px-4">
    <div className="my-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="flex items-center my-4">
        <button
          onClick={handleSort}
          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sort by Price
        </button>
        <label className="mr-2">Sort Order:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="bg-gray-100 px-2 py-1 rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

    <div className="flex items-center my-4">
      <p className="mr-4">Total items in cart: {totalItemsInCart}</p>
    </div>

    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
  );
};

export default ProductsPage;