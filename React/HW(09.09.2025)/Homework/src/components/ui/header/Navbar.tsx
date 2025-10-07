import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      {/* Лого слева */}
      <div className="text-xl font-bold">
        MyLogo
      </div>

      {/* Кнопки справа */}
      <div className="flex gap-6">
        <Link to="/register" className="hover:text-gray-300">
          Register
        </Link>
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;