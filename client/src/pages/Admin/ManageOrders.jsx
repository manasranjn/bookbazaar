import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const API = "http://localhost:5000/api/orders";

  // 🔹 Fetch All Orders (Admin)
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(res.data.data);
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API}/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  // 🔹 Status Colors
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-6 bg-linear-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">📦 Manage Orders</h1>
        <p className="text-gray-500 text-sm">
          Track and manage all customer orders
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5"
          >
            {/* User Info */}
            <div className="mb-4 border-b pb-3">
              <h2 className="font-semibold text-lg">
                {order.userId?.name || "User"}
              </h2>
              <p className="text-sm text-gray-500">{order.userId?.email}</p>
            </div>

            {/* Items */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.bookId?.image}
                    alt=""
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {item.bookId?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-4 pt-3 border-t">
              {/* Total */}
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-indigo-600">
                  ₹{order.totalPrice}
                </span>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Status Dropdown */}
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2 text-right">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No orders found</div>
      )}
    </div>
  );
};

export default ManageOrders;
