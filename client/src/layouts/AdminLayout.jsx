import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/AdminSide/Sidebar";
import { IoHome } from "react-icons/io5";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Hello {user.name}
          </h1>

          <div className="p-2 bg-gray-300 rounded-full text-gray-600 font-medium">
            <Link to="/">
              <IoHome />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
