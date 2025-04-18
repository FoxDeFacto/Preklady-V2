import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Slovník Novočeštiny</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Domů
            </Link>
            <Link 
              href="/search"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Vyhledávání
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;