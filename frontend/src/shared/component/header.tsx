import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          CoDe AnD ChAoS
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
