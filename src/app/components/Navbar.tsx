"use client";
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '../utilities/CartContext';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


 const {cart} = useCart();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          In<span className='text-[#E8C025] italic'>Bev</span>
        </div>
        <div className="hidden md:flex gap-8 space-x-4">
          <div className='relative'>
          <AiOutlineShoppingCart
            className="text-white text-2xl cursor-pointer "/>
            <p className="text-white text-xl absolute top-0 left-6"><sup className='rounded p-[2px] font-bold bg-red-600'>{cart.length}</sup></p>
          </div>
          <Link href="../products">Products</Link>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="flex items-center">
          <div className="mr-4 md:hidden">
          <div className='relative'>
          <AiOutlineShoppingCart
            className="text-white text-2xl cursor-pointer "/>
            <p className="text-white text-xl absolute top-0 left-6"><sup className='rounded p-[2px] font-bold bg-red-600'>{cart.length}</sup></p>
          </div>
            
          </div>
          <div className="md:hidden">
            {isMenuOpen ? (
              <AiOutlineClose
                onClick={toggleMenu}
                className="text-white text-2xl cursor-pointer"
              />
            ) : (
              <GiHamburgerMenu
                onClick={toggleMenu}
                className="text-white text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      )}
    </nav>
  );
}
