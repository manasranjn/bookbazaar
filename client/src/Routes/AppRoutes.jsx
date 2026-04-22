import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoutes from "./ProtectedRoutes";

//! USER PAGES
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import Categories from "../pages/User/Category";
import Books from "../pages/User/Books";
import BookDetails from "../pages/User/BookDetails";
import Cart from "../pages/User/Cart";
import OrderHistory from "../pages/User/OrderHistory";
import Order from "../pages/User/Order";

//! ADMIN
import Dashboard from "../pages/Admin/Dashboard";
import ManageBooks from "../pages/Admin/ManageBooks";
import ManageCategories from "../pages/Admin/ManageCategories";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageUsers from "../pages/Admin/ManageUsers";

import NotFound from "../pages/Common/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* USER LAYOUT */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoutes>
              <OrderHistory />
            </ProtectedRoutes>
          }
        />
      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<ManageBooks />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
