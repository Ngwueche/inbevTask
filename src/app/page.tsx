import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our <span className="text-white font-bold">
          In<span className='text-[#E8C025] italic'>Bev</span>
        </span> Store</h1>
        <p className="text-gray-300 mb-8">
          Discover a wide range of high-quality products. Your one-stop shop for all your needs.
        </p>
        <Link href="/products" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
          
            Explore Products
          
        </Link>
      </div>
    </div>
  );
};

export default Home;