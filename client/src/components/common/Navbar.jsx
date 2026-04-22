import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import assets from "../../assets/assets.js";
import Login from "../../pages/Common/Login.jsx";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  const { cartCount } = useCart();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold" : ""
              }
            >
              Books
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold" : ""
              }
            >
              Categories
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold" : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search books..."
            className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl text-gray-700 hover:text-indigo-600 transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* Auth Section */}

          {!user ? (
            <button
              className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              {/* Avatar */}
              <div
                onClick={() => setDropdown(!dropdown)}
                className="w-10 h-10 cursor-pointer flex items-center justify-center bg-indigo-600 text-white rounded-full font-bold"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown */}
              {dropdown && (
                <div
                  className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border"
                  ref={dropdownRef}
                >
                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className="block rounded-t-lg cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => navigate("/order-history")}
                    className={`${user.role === "admin" ? "rounded-none" : "rounded-t-lg"} block w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100`}
                  >
                    Order History
                  </button>
                  <button
                    onClick={handleLogout}
                    className=" block w-full rounded-b-lg cursor-pointer text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 pb-6">
          <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/books" onClick={() => setMenuOpen(false)}>
                Books
              </Link>
            </li>

            {/* <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
            </li> */}

            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>

            <li>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      )}

      <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
