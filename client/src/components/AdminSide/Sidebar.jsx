import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import assets from "../../assets/assets";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Books", path: "/admin/books", icon: <FaBook /> },
    { name: "Categories", path: "/admin/categories", icon: <FaList /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  ];

  return (
    <div
      className={`h-screen ${
        open ? "w-64" : "w-20"
      } bg-gray-900 text-gray-300 p-5 pt-8 duration-300 relative flex flex-col justify-between`}
    >
      {/* Toggle Button */}
      <FaBars
        className="absolute top-6 right-4 text-gray-400 cursor-pointer hover:text-white"
        onClick={() => setOpen(!open)}
      />

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 w-10 object-cover rounded-lg"
          />
        </div>
        <h1 className="text-2xl text-center font-bold mb-5 text-white tracking-wide">
          {open ? "Admin Panel" : ""}
        </h1>

        {/* Menu */}
        <ul className="space-y-3">
          {menu.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {/* Icon */}
              <span className="text-lg">{item.icon}</span>

              {/* Text */}
              {open && <span className="whitespace-nowrap">{item.name}</span>}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          <FaSignOutAlt />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
