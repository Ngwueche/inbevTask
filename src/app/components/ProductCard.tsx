import React from 'react';
import Product from '../types/Product';
interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
  }



const ProductCard: React.FC<ProductCardProps> = ({ product,onAddToCart }) => {

  return (
<div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
    <a href="#" className="flex-1">
        <img className="p-8 rounded-t-lg object-cover" src={product.thumbnail} alt="product image" />
    </a>
    <div className="px-5 pb-5 flex-1 flex flex-col">
        <a href="#" className="flex-1">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
            <h6 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{product.description}</h6>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
            <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md w-full"
        >
          Add to Cart
        </button>
        </div>
    </div>
</div>



    )
}
export default ProductCard;

