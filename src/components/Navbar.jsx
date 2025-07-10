import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-800 backdrop-blur-md shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        Vehicle Detection
      </h1>
      <nav className="space-x-6">
        <Link
          to="/"
          className={`font-medium transition ${
            isActive("/")
              ? "text-blue-400"
              : "text-gray-300 hover:text-blue-400"
          }`}
        >
          Home
        </Link>
        <Link
          to="/cctv"
          className={`font-medium transition ${
            isActive("/cctv")
              ? "text-blue-400"
              : "text-gray-300 hover:text-blue-400"
          }`}
        >
          CCTV
        </Link>
        <Link
          to="/esp"
          className={`font-medium transition ${
            isActive("/esp")
              ? "text-green-400"
              : "text-gray-300 hover:text-green-400"
          }`}
        >
          ESP32-CAM
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
