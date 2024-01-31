"use client";
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          In<span className='text-[#E8C025] italic'>Bev</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <AiOutlineShoppingCart
            className="text-white text-2xl cursor-pointer"
            
          />
          <Link href="../products">Products</Link>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="flex items-center">
          <div className="mr-4 md:hidden">
            <AiOutlineShoppingCart
              className="text-white text-2xl cursor-pointer"
              
            />
            {cartCount > 0 && (
              <span className="text-white ml-1">{cartCount}</span>
            )}
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
        <div className="md:hidden mt-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      )}
    </nav>
  );
}
